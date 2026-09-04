const validate = require("../../middlewares/validator_middleware");
const Coupon = require("../../models/coupon_model");
const Err = require("../app_error");
const { check } = require("express-validator");

exports.createCheckoutSessionValidator = [
  check("products")
    .notEmpty()
    .withMessage("products is required")
    .isArray({ min: 1 })
    .withMessage("products must be a non-empty array"),

  check("products.*.title").notEmpty().withMessage("Product title is required"),

  check("products.*.description")
    .notEmpty()
    .withMessage("Product description is required"),

  check("products.*.price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number")
    .toFloat(),

  check("products.*.previewImg")
    .notEmpty()
    .withMessage("Product preview image is required"),

  check("products.*._id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),

  check("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Product quantity must be a positive integer")
    .toInt(),

  check("couponCode")
    .optional({ values: "falsy" })
    .custom(async (i, { req }) => {
      const coupon = await Coupon.findOne({ code: i });
      switch (true) {
        case !coupon:
          throw Err.create("coupon not found", 404, true);

        case !coupon.isActive:
          throw Err.create("coupon is not active", 400, true);

        case req.user.id !== coupon.userId.toString():
          throw Err.create("coupon not available for that user", 400, true);

        case coupon.expireDate <= new Date():
          coupon.isActive = false;
          await coupon.save();
          throw Err.create("coupon is expired", 400, true);
      }
      req.coupon = coupon
      return true;
    }),
  validate,
];
