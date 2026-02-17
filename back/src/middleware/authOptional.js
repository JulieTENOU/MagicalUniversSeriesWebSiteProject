const auth = require("./auth");

// Si pas d'header Authorization -> on laisse passer sans req.user
module.exports = function authOptional(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return next();

  // Si token présent, on applique le vrai auth (qui remplit req.user)
  return auth(req, res, next);
};
