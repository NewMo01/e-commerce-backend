const { check } = require("express-validator");
const validate = require("../../middlewares/validator_middleware");



exports.postValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("product title is required")
    .isLength({ max: 100, min: 3 })
    .withMessage("product title must be between 3 to 100 character"),
  check("description")
    .trim()
    .notEmpty()
    .withMessage("product description is required")
    .isLength({ min: 20 })
    .withMessage("product description must be at least 20 character"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity can not be empty")
    .isInt()
    .withMessage("product quantity must be a number")
    .toInt(),
  check("sold")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("product sold must be a number")
    .toInt(),
  check("price")
    .notEmpty()
    .withMessage("product price is required")
    .isFloat()
    .withMessage("product price must be a number")
    .toFloat(),
  check("discountPrice")
    .optional({ values: "falsy" })
    .isFloat()
    .withMessage("discount price must be float")
    .toFloat()
    .custom((v, { req }) => {
      if (req.body.price > v) return true;
      throw new Error("discount must be lower than price");
    }),
  check("colors").optional({ values: "falsy" }).isArray(),
  check("images").optional({ values: "falsy" }).isArray(),
  check("previewImg")
    .trim()
    .notEmpty()
    .withMessage("preview image can not be empty"),
  check("category")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("invalid category id"),
  check("subCategoryId")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("invalid subcategory id"),
  check("brandId")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("INVALID BRAND ID"),
  check("ratingsAvg")
    .optional({ values: "falsy" })
    .isFloat({ min: 1, max: 5 })
    .withMessage("must be a number between 1 to 5")
    .toFloat(),
  check("ratingsQuantity")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("must be a number")
    .toInt(),
  validate,
];

exports.getVaildator = [
  check("id").isMongoId().withMessage("invalid product id"),
  validate,
];
exports.updateVaildator = [
  check("id").isMongoId().withMessage("invalid product id"),
  validate,
];
exports.deleteVaildator = [
  check("id").isMongoId().withMessage("invalid product id"),
  validate,
];
