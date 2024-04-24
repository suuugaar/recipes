const router = require('express').Router();
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');

module.exports = router.use('/register', registerRouter);
module.exports = router.use('/login', loginRouter);
