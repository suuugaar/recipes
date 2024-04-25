// Создание ручки
const router = require("express").Router();
// Подключение утилиты для рендера страниц
const renderTemplate = require("../utils/renderTemplate");

// Подключение модели из БД
const { User, Recipe } = require("../../db/models");

// Подключение страниц
const Home = require("../views/Home");
const Register = require("../views/Register");
const Login = require("../views/Login");
const Recipes = require("../views/Favorites");

// Подключение мидлварок
const { secureRoute, checkUser } = require("../middlewares/common");

// Работа мидлварок
router.use("/register", secureRoute);
router.use("/login", secureRoute);
router.use("/recipes", checkUser);

// Отрисовка страниц
// Главная
router.get("/", (req, res) => {
  const { login } = req.session;
  renderTemplate(Home, { login }, res);
});

// Избранное
router.get("/favorites", async (req, res) => {
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
    // const recipes = [{
    //   id: 1, name: 'Ананас', photo: 'photo', ingridientsCount: 5, time: 10,
    // }, {
    //   id: 2, name: 'Арбуз', photo: 'photo', ingridientsCount: 10, time: 15,
    // }];
    renderTemplate(Recipes, { login, recipes }, res);
  } catch (error) {
    console.error(error);
  }
});

// Регистрация
router.get("/register", (req, res) => {
  renderTemplate(Register, {}, res);
});

// Авторизация
router.get("/login", (req, res) => {
  renderTemplate(Login, {}, res);
});

// Выход
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookieName");
    res.redirect("/");
  });
});

router.get("/", async (req, res) => {
  const { time, query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "Необходимо указать поисковый запрос" });
  }

  const url = `https://api.edamam.com/search?q=${encodeURIComponent(
    query
  )}&time=${time}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json(); // Парсинг ответа в JSON
    res.json(data);
  } catch (error) {
    console.error("Ошибка при запросе к API Edamam:", error);
    res
      .status(500)
      .json({ error: "Ошибка сервера при обработке запроса к API Edamam" });
  }
});

// Отрисовка конкретного рецепта
// module.exports = router.get('/:id', (req, res) => {
//   // const {id} = req.params;
//   // const specialRecept = await Recept.findOne({where: {id}})

//   const { login } = req.session;
//   renderTemplate(CurrentRecipe, { login }, res);
// });

module.exports = router;
