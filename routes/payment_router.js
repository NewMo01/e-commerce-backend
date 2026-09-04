const express = require("express");
const controller = require("../controllers/payment_controller");
const authenticated = require("../middlewares/authentication_middleware");
const validator = require("../helpers/validation_layer/payment_validator");

const router = express.Router();

router.use(authenticated);

router.post(
  "/create-checkout-session",
  validator.createCheckoutSessionValidator,
  controller.createCheckoutSession,
);
router.post("/checkout-success", controller.checkoutSuccess);

module.exports = router;
