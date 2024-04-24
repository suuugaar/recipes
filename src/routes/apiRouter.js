const router = require('express').Router();
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const recipesPouter = require('./recipesPouter');

module.exports = router.use('/register', registerRouter);
module.exports = router.use('/login', loginRouter);
module.exports = router.use('/recipes', recipesPouter);

const APP_ID = 'your-app-id'; // Замените на ваш App ID
const APP_KEY = 'your-app-key'; // Замените на ваш App Key

router.get('/', async (req, res) => {
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

module.exports = router;
