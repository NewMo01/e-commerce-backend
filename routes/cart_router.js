const express = require("express");
const controller = require("../controllers/cart_controller");
const authenticated = require("../middlewares/authentication_middleware");
const authorized = require("../middlewares/authorization_middleware");
const {
  idValidator,
  updateCartItem,
} = require("../helpers/validation_layer/cart_validator");
const router = express.Router();

router.use(authenticated, authorized("customer"));
router.use("/:productId", idValidator);

router
  .route("/")
  .get(controller.getCartItems)
  .delete(controller.removeAllFromCart);

router
  .route("/:productId")
  .post(controller.addCartItem)
  .patch(updateCartItem, controller.updateCartItem)
  .delete(controller.removeCartItem);

module.exports = router;
