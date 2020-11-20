const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "denied denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "token invalid" });
  }
}

module.exports = {
  checkToken,
};
