const express = require("express");
const controller = require("../controllers/product_controller");
const validator = require("../helpers/validation_layer/product_validator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    controller.putCatIdFromParamsToBody,
    validator.postValidator,
    controller.createProduct,
  )
  .get(controller.createFilterObject, controller.getProducts);

router
  .route("/:id")
  .get(validator.getVaildator, controller.getProduct)
  .patch(validator.updateVaildator, controller.updateProduct)
  .delete(validator.deleteVaildator, controller.deleteProduct);

module.exports = router;
