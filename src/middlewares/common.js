function secureRoute(req, res, next) {
  if (!req.session.login) {
    // нет в сессии = иди регайся, юзер!
    next();
  } else {
    res.redirect("/");
  }
}

function checkUser(req, res, next) {
  if (req.session.login) {
    // есть в сессии (есть кука) = ок, иди на главную или куда-то, куда есть доступ
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = { secureRoute, checkUser };
