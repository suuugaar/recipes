const recipeRouter = require("express").Router();
require("dotenv").config();

const APP_KEY = process.env.APP_KEY;

const APP_ID = process.env.APP_ID;

recipeRouter.get("/", async (req, res) => {
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
      const recipe = hit.recipe;
      return {
        name: recipe.label,
        timeToCook: recipe.totalTime,
        imageUrl: recipe.image,
        ingredients: recipe.ingredients.map((ing) => ing.text),
      };
    });

    res.send({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Error fetching recipes");
  }
});

module.exports = recipeRouter;
