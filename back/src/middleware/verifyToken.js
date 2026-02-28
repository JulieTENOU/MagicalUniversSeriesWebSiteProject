const authConfig = require("../config/authKey");
const jwt = require("jsonwebtoken");


module.exports = {
 verifyToken: async function (req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
}
};