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
                    <a className="nav-link" href="/">
                      Главная
                    </a>
                    <a className="nav-link" href="/recipes">
                      Избранное
                    </a>
                    <a className="nav-link" href="/logout">
                      Выйти
                    </a>
                  </div>
                  {children}
                </div>
              ) : (
                <div className="container">
                  <div className="nav">
                    <a className="nav-link" href="/">
                      Главная
                    </a>
                    <a className="nav-link" href="/login">
                      Войти
                    </a>
                    <a className="nav-link" href="/register">
                      Зарегистрироваться
                    </a>
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
