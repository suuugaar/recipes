// Создание ручки
const router = require('express').Router();
// Подключение утилиты для рендера страниц
const renderTemplate = require('../utils/renderTemplate');

// Подключение страниц
const Main = require('../views/Main');
const Recipes = require('../views/Recipes');
const CurrentRecipe = require('../views/CurrentRecipe');
const Register = require('../views/Register');
const Login = require('../views/Login');



// Подключение мидлварок
const { secureRoute, checkUser } = require('../middlewares/common');

// Работа мидлварок
module.exports = router.use('/register', secureRoute);
module.exports = router.use('/login', secureRoute);
module.exports = router.use('/recipes', checkUser);

// Отрисовка страниц
module.exports = router.get('/', (req, res) => {
  const { login } = req.session;
  renderTemplate(Main, { login }, res);
});

module.exports = router.get('/recipes', (req, res) => {
  const { login } = req.session;
  renderTemplate(Recipes, { login }, res);
});

module.exports = router.get('/register', (req, res) => {
  renderTemplate(Register, {}, res);
});

module.exports = router.get('/login', (req, res) => {
  renderTemplate(Login, {}, res);
});

module.exports = router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
});

module.exports = router.get('/:id', (req, res) => {
  const {id} = req.params;
  const specialRecept = await Recept.findOne({where: {id}})
  
  const { login } = req.session;
  renderTemplate(CurrentRecipe, { login }, res);
});
