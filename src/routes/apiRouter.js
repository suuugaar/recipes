const router = require('express').Router();
const recipesRouter = require('./recipesRouter');

module.exports = router.use('/recipes', recipesRouter);
