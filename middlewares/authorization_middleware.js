const Err = require("../helpers/app_error");

module.exports = (...roles) =>
  function (req, res, next) {
    console.log(roles)
    console.log(req.role);
    if (!roles.includes(req.role)) {
      return next(Err.create("You are not authorized", 400, true));
    }
    next();
  };
