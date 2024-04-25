const React = require("react");

module.exports = function Layout({ children, login }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <title>Книга рецептов</title>
      </head>
      <body>
        <div className="content">
          <div className="container">
            <header className="header">
              {login ? (
                <div className="container">
                  <div className="nav">
                    <div class="site-title">CHEFF KITCHEEN</div>
                    <div class="dropdown">
                    <a className="dropdown-item" href="/">
                      Главная
                    </a>
                      <div class="dropdown-content">
                      <a className="dropdown-item" id='check' href="/favorites">
                      Избранное
                    </a>
                    <a className="dropdown-item" href="/logout">
                      Выйти
                    </a>
                      </div>
                    </div>
                  </div>
                  {children}
                </div>
              ) : (
                <div className="container">
                  <div className="nav">
                    <div class="site-title">Книга рецептов</div>
                    <div class="dropdown">
                    <a className="dropdown-item" href="/">
                      Главная
                    </a>
                      <div class="dropdown-content">
                      <a className="dropdown-item" href="/register">
                      Зарегистрироваться
                    </a>
                    <a className="dropdown-item" href="/login">
                      Войти
                    </a>
                      </div>
                    </div>
                  </div>
                  {children}
                </div>
              )}
            </header>
          </div>
        </div>
      </body>
    </html>
  );
};
