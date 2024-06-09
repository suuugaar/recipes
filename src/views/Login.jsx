const React = require('react');
const Layout = require('./Layout');

function Login() {
  return (
    <Layout>
      <div className="register-wrapper">
        <div className="register-content">
      <h2 className="form-title">Войдите в аккаунт</h2>

      <form
        className="form"
        action="/login"
        method="POST"
        id="logForm"
      >
        <label htmlFor="log-email" className="form-label">Почта:</label>
        <input className="form-input" name="email" type="text" id="log-email" />

        <label htmlFor="log-password" className="form-label">Пароль:</label>
        <input className="form-input" name="password" type="password" id="log-password" />

        <button type="submit" className="form-btn">
          Войти
        </button>
      </form>

      <h3 className="logErrMsg" />
      </div>
      </div>
      <script defer src="js/login.js" />
    </Layout>
  );
}

module.exports = Login;
