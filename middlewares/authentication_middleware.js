const jwt = require("jsonwebtoken");
const Err = require("../helpers/app_error");

module.exports = function (req, res, next) {

  const token = req.cookies.access_token;
  if (!token) {
    return next(Err.create("no token provided", 400, true));
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    return next(Err.create("invalid token", 400, true));
  }

  req.role = decoded.role;

  next();
};
