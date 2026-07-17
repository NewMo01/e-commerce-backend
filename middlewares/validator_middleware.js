const { validationResult } = require("express-validator");

const MyErr = require('../helpers/app_error')

module.exports = function(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(MyErr.create(result.array(),400, true))
  }
  next();
};
