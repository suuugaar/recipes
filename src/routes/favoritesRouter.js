const recipesRouter = require('express').Router();
const { Recipe, User, Favorite } = require('../../db/models');

module.exports = recipesRouter.post('/', async (req, res) => {
  const id = req.session.userId;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Recipe,
      },
    });
    const userData = user.get({ plain: true });
    const recipes = userData.Recipes;
    const { argument, way } = req.body;
    if (argument === 'ingredients' && way === 'ascending') {
      recipes.sort((a, b) => a.ingridientsCount - b.ingridientsCount);
    }
    if (argument === 'ingredients' && way === 'descending') {
      recipes.sort((a, b) => b.ingridientsCount - a.ingridientsCount);
    }
    if (argument === 'time' && way === 'descending') {
      recipes.sort((a, b) => b.time - a.time);
    }
    if (argument === 'time' && way === 'ascending') {
      recipes.sort((a, b) => a.time - b.time);
    }
    res.json({ recipes });
  } catch (error) {
    console.error(error);
  }
});

recipesRouter.post('/:id', async (req, res) => {
  try {
    const user_id = req.session.userId;
    const { id } = req.params;
    const subscribe = await Favorite.create({ user_id, recipe_id: id });
    if (subscribe) {
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
});

recipesRouter.delete('/:id', async (req, res) => {
  try {
    const user_id = req.session.userId;
    const { id } = req.params;
    const unSubscribe = await Favorite.destroy({ where: { user_id, recipe_id: id } });
    if (unSubscribe) {
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
});
