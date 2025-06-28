const authConfig = require("../config/authKey");
const jwt = require("jsonwebtoken");

async function verifyToken (req, res, next) {
  const token = req.session.token;

  if (!token) {
    res.status(400).send("No token provided!");
    res.redirect("/connexion");
  }
  await jwt.verify(token, authConfig.secret, async function (err, decoded) {
    if (err) {
      res.status(400).send("You are unauthorized to go further!");
      res.redirect("/connexion");
    }
    req.users = decoded.users_email;
    return next();
  });
};

module.exports = verifyToken;