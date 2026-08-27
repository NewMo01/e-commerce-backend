const express = require("express");
const controller = require("../controllers/coupon_controller");
const authenticated = require('../middlewares/authentication_middleware')
const authorized = require('../middlewares/authorization_middleware')
const { createValidator } = require("../helpers/validation_layer/coupon_validator");
const router = express.Router();

router.use(authenticated)

router.use("/",authorized('admin'))
router
  .route("/")
  .post(createValidator, controller.createCoupon)
  .get(controller.getListOfCoupons);

router
  .route("/:code")
  .get(controller.getCoupon)
  .delete(authorized('admin'),controller.deleteCoupon);

module.exports = router;
