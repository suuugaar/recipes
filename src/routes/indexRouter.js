// Создание ручки
const router = require('express').Router();
// Подключение утилиты для рендера страниц
const renderTemplate = require('../utils/renderTemplate');

// Подключение модели из БД
const { User, Recipe } = require('../../db/models');

// Подключение страниц
const Main = require('../views/Main');
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

// Отрисовка страницы Избранное
module.exports = router.get('/recipes', async (req, res) => {
  const id = req.session.userId;
  const { login } = req.session;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Recipe,
      },
    });
    const userData = user.get({ plain: true });
    const recipes = userData.Recipes;
    renderTemplate(Recipes, { login, recipes }, res);
  } catch (error) {
    console.error(error);
  }
});

// Отрисовка страницы Регистрации
module.exports = router.get('/register', (req, res) => {
  renderTemplate(Register, {}, res);
});

// Отрисовка страницы Авторизации
module.exports = router.get('/login', (req, res) => {
  renderTemplate(Login, {}, res);
});

// Выход
module.exports = router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
});

// Отрисовка конкретного рецепта
// module.exports = router.get('/:id', (req, res) => {
//   // const {id} = req.params;
//   // const specialRecept = await Recept.findOne({where: {id}})

//   const { login } = req.session;
//   renderTemplate(CurrentRecipe, { login }, res);
// });
