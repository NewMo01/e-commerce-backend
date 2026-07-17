const { check } = require("express-validator");
const validate = require("../../middlewares/validator_middleware");

exports.postValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("brand name is required")
    .isLength({ max: 32, min: 2 })
    .withMessage("brand name must be between 2 to 32 character"),
  validate,
];

exports.getValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validate,
];

exports.updateValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validate,
];

exports.deleteValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validate,
];
