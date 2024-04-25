// Создание роутера
const router = require("express").Router();

// Подключение ручек
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const recipeRouter = require("./apiRecipeRouter");
const translateRouter = require("./apiTranslateRouter");
const favoritesRouter = require("./favoritesRouter");
// Включение работы ручек
// Ручка регистрации
router.use("/register", registerRouter);
// Ручка авторизации
router.use("/login", loginRouter);
// Ручка избранного
router.use("/recipes", recipeRouter);

router.use("/translate", translateRouter);

router.use("/favorites", favoritesRouter);


// Ручка добавления в избранное
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, location } = req.body;

    const newRecipe = await Party.create({
      name,
      date,
      time,
      location,
      owner: req.session.login,
    });
    res.json(newParty);
  } catch (err) {
    console.log("Ошибка:", err);
    res.status(500).send("Ошибка создания новой вечеринки");
  }
});

module.exports = router;
