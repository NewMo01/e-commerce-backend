const vaildate = require("../../middlewares/validator_middleware");
const { check } = require("express-validator");

exports.idVaildator = [
  check("productId")
    .notEmpty()
    .withMessage("product is required")
    .isMongoId()
    .withMessage("invalid product id"),
  vaildate,
];

exports.updateCartItem = [
    this.idVaildator,
  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .trim()
    .isInt()
    .withMessage("quantity must be a number")
    .toInt(),
  vaildate,
];

