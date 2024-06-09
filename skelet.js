// npm init -y
// npm i
// npx create-gitignore node
// npm init @eslint/config


// npm i express
// npm i -D nodemon morgan
//! Прописать скрипты

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "rebase": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all",
//     "start": "node app.js",
//     "dev": "nodemon src/app.js --ignore sessions --ext js,jsx"
//   },

// перенести папки src и public
//* npm install @babel/core @babel/preset-env @babel/preset-react  @babel/register react react-dom
// перенести файлы .babelrc, .env, .env_example
// npm i dotenv


// db:
// npm i sequelize pg pg-hstore - устанавливаем зависимости postgres
// npm i -D sequelize-cli - устанавливаем sequelize cli
// перенести файл `.sequelizerc`
// npx sequelize-cli init - создаём структуру для работы с sequelize
// заменить файл `config.json`
// npx sequelize-cli model:generate --name User --attributes firstName:string,age:integer

// npx sequelize-cli model:generate --name User --attributes login:string,password:string,email:string
// npx sequelize-cli model:generate --name Channel --attributes title:string,price:integer
// npx sequelize-cli model:generate --name Userschannels --attributes userId:integer,channelId:string

// many to many:
// в миграции промежуточной таблицы добавить ссылки на основные таблицы (миграции основых таблиц не менять)
// в моделях основных таблиц добавить связь через промежуточную таблицу (модель промежуточной таблицы не менять)
// миграция `npx sequelize-cli db:migrate`
// cоздали seeder командой `npx sequelize-cli seed:generate --name channel`
// npx sequelize db:seed:all


// куки и сессии
// npm i express-session session-file-store bcrypt

// Добавить sessions в gitignore
// В package.json "dev": "nodemon src/app.js --ignore sessions --ext js,jsx",
// Подключение сессии в app.js

// в роутере подключение bcrypt для хэширования
const bcrypt = require('bcrypt');
