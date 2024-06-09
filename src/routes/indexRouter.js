// Создание ручки
const router = require('express').Router();
// Подключение утилиты для рендера страниц
const renderTemplate = require('../utils/renderTemplate');

// Подключение модели из БД
const { User, Recipe } = require('../../db/models');

// Подключение страниц
const Home = require('../views/Home');
const Register = require('../views/Register');
const Login = require('../views/Login');
const Recipes = require('../views/Favorites');
const DetailRecipe = require('../views/Recipe');

// Подключение мидлварок
const { secureRoute, checkUser } = require('../middlewares/common');

// Работа мидлварок
router.use('/register', secureRoute);
router.use('/login', secureRoute);
router.use('/recipes', checkUser);

// Отрисовка страниц
// Главная
router.get('/', (req, res) => {
  const { login } = req.session;
  renderTemplate(Home, { login }, res);
});

// Избранное
router.get('/favorites', async (req, res) => {
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

// Регистрация
router.get('/register', (req, res) => {
  renderTemplate(Register, {}, res);
});

// Авторизация
router.get('/login', (req, res) => {
  renderTemplate(Login, {}, res);
});

// Выход
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
});

// Конкретный рецепт
router.get('/recipe-details/:id', async (req, res) => {
  const { id } = req.params; // Получаем ID из параметров маршрута

  try {
    // Отправляем запрос к API
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Обработка ошибочного ответа от API
    }

    const { recipe } = await response.json(); // Десериализация JSON ответа и получение рецепта

    if (!recipe) {
      return res.status(404).send('Recipe not found'); // Обработка ситуации, когда рецепт не найден
    }

    // Рендеринг страницы с деталями рецепта
    renderTemplate(DetailRecipe, { recipe }, res);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({
      error: 'Server error while processing the recipe details request',
    });
  }
});

module.exports = router;
