// Добавление библитек и модулей
const express = require('express');
require('@babel/register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Подключение ручек
const indexRouter = require('./routes/indexRouter');
const apiRouter = require('./routes/apiRouter');

// Создание сервера
const app = express();

// Создание порта
const { PORT } = process.env;

// Конфиг для куки
const sessionConfig = {
  name: 'cookieName', // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Mellon', // SESSION_SECRET в .env
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};

// Подключение миддлварок
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session(sessionConfig));

// Включение работы ручек
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту: ${PORT}`);
});
