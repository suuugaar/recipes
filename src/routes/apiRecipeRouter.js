const recipeRouter = require('express').Router();
require('dotenv').config();

const { User, Favorite, Recipe } = require('../../db/models');

const { APP_KEY } = process.env;

const { APP_ID } = process.env;

recipeRouter.get('/', async (req, res) => {
  const { query } = req.query;
  console.log(query);
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&time=1%2B`;

  try {
    const apiResponse = await fetch(url);
    if (!apiResponse.ok) {
      throw new Error(`Failed to fetch recipes: ${apiResponse.status}`);
    }
    const data = await apiResponse.json();

    const recipes = data.hits.map((hit) => {
      const { recipe } = hit;
      return {
        id: recipe.uri.split('_')[1],
        category: recipe.category,
        name: recipe.label,
        timeToCook: recipe.totalTime,
        imageUrl: recipe.image,
        ingredients: recipe.ingredients.map((ing) => ing.text),
      };
    });

    res.send({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Error fetching recipes');
  }
});

recipeRouter.get('/recipe-details/:id', async (req, res) => {
  const recipeId = req.params.id;
  const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe details: ${response.status}`);
    }
    const { recipe } = await response.json();

    res.render('recipeDetails', { recipe });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ручка для добавления в избранное
recipeRouter.post('/:id', async (req, res) => {
  const recipeId = req.params.id;
  const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe details: ${response.status}`);
    }

    const { recipe } = await response.json();
    console.log(recipe);
    const ingredientsString = JSON.stringify(recipe.ingredients);

    const newRecipe = await Recipe.create({
      photo: recipe.image, name: recipe.label, ingridients: ingredientsString, ingridientsCount: recipe.ingredients.length, time: recipe.totalTime, info: recipe.category, foreignId: recipeId,
    });

    const newFavorite = await Favorite.create({ user_id: req.session.userId, recipe_id: newRecipe.id });

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка создания нового рецепта и любимого рецепта:', error);
    res.status(500).send('Ошибка создания нового рецепта и любимого рецепта.');
  }
});

// Ручка для удаления из избранного
recipeRouter.delete('/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const destroyedRecipe = await Recipe.findOne({
      where: {
        foreignId: recipeId,
      },
    });

    await Favorite.destroy({ where: { user_id: req.session.userId, recipe_id: destroyedRecipe.id } });

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления рецепта из избранного:', error);
    res.status(500).send('Ошибка удаления рецепта из избранного!');
  }
});

module.exports = recipeRouter;
