const { check } = require("express-validator");
const validate = require("../../middlewares/validator_middleware");

exports.postValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("subcategory name is required")
    .isLength({ min: 2, max: 32 })
    .withMessage("subcategory name must be between 2 and 32 character"),
  check("categoryId")
    .notEmpty()
    .withMessage("subcategory must be belong to category")
    .isMongoId()
    .withMessage("invalid category id"),
  validate,
];

exports.getValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  validate,
];

exports.updateValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  validate,
];

exports.deleteValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  validate,
];
