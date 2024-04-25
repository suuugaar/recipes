const regRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

regRouter.post('/', async (req, res) => {
  try {
    const { email, login, password } = req.body;
    const sameLogin = await User.findOne({ where: { login } });
    const sameEmail = await User.findOne({ where: { email } });
    if (sameLogin) {
      console.log(`Ошибка: данный логин - "${login}" уже занят.`);
      res.json({ err: `Ошибка: данный логин - "${login}" уже занят.` });
    } else if (sameEmail) {
      console.log(`Ошибка: данная почта - "${email}" уже занята.`);
      res.json({ err: `Ошибка: данная почта - "${email}" уже занята.` });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, login, password: hash });

      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.login = newUser.login;

      req.session.save(() => {
        res.json({ regDone: `Регистрация прошла успешна, ${login}!` });
      });
    }
  } catch (error) {
    res.send(`regRouter => ${error}`);
  }
});

module.exports = regRouter;
