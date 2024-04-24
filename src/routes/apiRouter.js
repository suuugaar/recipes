// Создание роутера
const router = require('express').Router();

// Подключение ручек
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const recipesRouter = require('./recipesRouter');

// Включение работы ручек
// Ручка регистрации
module.exports = router.use('/register', registerRouter);
// Ручка авторизации
module.exports = router.use('/login', loginRouter);
// Ручка избранного
module.exports = router.use('/recipes', recipesRouter);

const APP_ID = 'your-app-id'; // Замените на ваш App ID
const APP_KEY = 'your-app-key'; // Замените на ваш App Key
module.exports = router.get('/', async (req, res) => {
  const { time, query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Необходимо указать поисковый запрос' });
  }

  const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&time=${time}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json(); // Парсинг ответа в JSON
    res.json(data);
  } catch (error) {
    console.error('Ошибка при запросе к API Edamam:', error);
    res.status(500).json({ error: 'Ошибка сервера при обработке запроса к API Edamam' });
  }
});

// Ручка добавления в избранное
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, date, time, location,
    } = req.body;

    const newRecipe = await Party.create({
      name, date, time, location, owner: req.session.login,
    });
    res.json(newParty);
  } catch (err) {
    console.log('Ошибка:', err);
    res.status(500).send('Ошибка создания новой вечеринки');
  }
});
