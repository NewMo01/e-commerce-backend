const vaildate = require("../../middlewares/validator_middleware");
const { check } = require("express-validator");

exports.idValidator = [
  check("productId")
    .notEmpty()
    .withMessage("product is required")
    .isMongoId()
    .withMessage("invalid product id"),
  vaildate,
];

exports.updateCartItem = [
    this.idValidator,
  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .trim()
    .isInt()
    .withMessage("quantity must be a number")
    .toInt(),
  vaildate,
];

