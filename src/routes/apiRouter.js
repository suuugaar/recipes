// Создание роутера
const router = require('express').Router();

// Подключение ручек
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const recipeRouter = require('./apiRecipeRouter');
const translateRouter = require('./apiTranslateRouter');
const favoritesRouter = require('./favoritesRouter');
// Включение работы ручек
// Ручка регистрации
router.use('/register', registerRouter);
// Ручка авторизации
router.use('/login', loginRouter);
// Ручка избранного
router.use('/recipes', recipeRouter);

router.use('/translate', translateRouter);

router.use('/favorites', favoritesRouter);

module.exports = router;
