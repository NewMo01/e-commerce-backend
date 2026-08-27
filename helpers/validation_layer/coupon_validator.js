const { check } = require("express-validator");
const validate = require("../../middlewares/validator_middleware");

exports.createValidator = [
  check("code").trim().notEmpty().withMessage("coupon code is required"),
  check("discountPercentage")
    .notEmpty()
    .withMessage("coupon must have discount percentage")
    .isInt({ min: 0, max: 100 })
    .withMessage("discount percentage must be a number between 0,100")
    .toInt(),
  check("expireDate")
    .notEmpty()
    .withMessage("expire date is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage(
      "invalid date format, must be like:'YYYY-MM-DD', ex: 2026-08-26",
    )
    .toDate(),
  check("isActive")
    .customSanitizer((v) => (v === 0 || v === "" ? undefined : v))
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean")
    .toBoolean(),
  check("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("invalid id"),
  validate,
];
