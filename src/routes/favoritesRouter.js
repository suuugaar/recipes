const favoritesRouter = require('express').Router();
const { Recipe, User } = require('../../db/models');

module.exports = favoritesRouter.post('/', async (req, res) => {
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
