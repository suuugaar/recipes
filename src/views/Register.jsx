const React = require('react');
const Layout = require('./Layout');

function Register() {
  return (
    <Layout>
      <h2 className="form-title">Создайте аккаунт</h2>

      <form
        className="form"
        action="/register"
        method="POST"
        id="regForm"
      >
        <label htmlFor="register-email" className="form-label">Почта:</label>

        <input className="form-input" name="email" type="text" id="register-email" />

        <label htmlFor="register-login" className="form-label">Логин:</label>

        <input className="form-input" name="login" type="text" id="register-login" />

        <label htmlFor="register-password" className="form-label">Пароль:</label>

        <input className="form-input" name="password" type="password" id="register-password" />

        <button type="submit" className="form-btn">
          Создать Аккаунт
        </button>
      </form>

      <h3 className="regErrMsg" />
      <script defer src="js/register.js" />
    </Layout>
  );
}

module.exports = Register;
