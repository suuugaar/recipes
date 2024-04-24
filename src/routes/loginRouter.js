const logRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

logRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Ошибка: такого пользователя не существует!');
      res.status(404).json({ err: 'Ошибка: такого пользователя не существует!' });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.save(() => {
          console.log('Пароль правильный');
          res.status(200).json({ regDone: true });
        });
      } else {
        console.log('Ошибка: пароль не верный!');
        res.status(401).json({ err: 'Ошибка: пароль не верный!' });
      }
    }
  } catch (error) {
    console.log(`Ошибка в логике роутера: ${error}`);
    res.status(500).json({ err: 'Ошибка сервера' });
  }
});

module.exports = logRouter;
