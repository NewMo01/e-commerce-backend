const jwt = require("jsonwebtoken");
const Err = require("../helpers/app_error");
const User = require('../models/user_model')

module.exports = async function (req, res, next) {

  const token = req.cookies.access_token;
  if (!token) {
    return next(Err.create("unauthorized - no token provided", 401, true));
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    return next(Err.create("invalid token", 400, true));
  }

  req.user = await User.findById(decoded.id).select('-password')

  req.role = decoded.role;


  next();
};
