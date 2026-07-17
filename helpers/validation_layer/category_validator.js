const { check } = require("express-validator");
const validateMiddleware = require("../../middlewares/validator_middleware");

exports.postValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("category name must be between 3 and 32 characters"),
  validateMiddleware,
];

exports.getValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid category id"),
  validateMiddleware,
];

exports.updateValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid category id"),
  validateMiddleware,
];

exports.deleteValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid category id"),
  validateMiddleware,
];
