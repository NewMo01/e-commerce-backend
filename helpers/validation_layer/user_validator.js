const { check } = require("express-validator");
const validate = require("../../middlewares/validator_middleware");
const constants = require("../constants");

exports.signupValidator = [
  check("name").trim().notEmpty().withMessage("user name is required"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("invalid email format"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("user password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  check("role")
    .optional({ values: "falsy" })
    .isIn(constants.USER_ROLES)
    .withMessage("invalid user role"),
  check("cartItems")
    .optional()
    .isArray()
    .withMessage("cart items must be an array"),
  validate,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  check("password").notEmpty().withMessage("password is required"),
  validate,
];
