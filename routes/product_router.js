const express = require("express");
const controller = require("../controllers/product_controller");
const validator = require("../helpers/validation_layer/product_validator");
const authenticatedChecker = require("../middlewares/authentication_middleware");
const authorizedChecker = require("../middlewares/authorization_middleware");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authenticatedChecker,
    authorizedChecker("admin"),
    controller.putCatIdFromParamsToBody,
    validator.postValidator,
    controller.createProduct,
  )
  .get(controller.createFilterObject, controller.getProducts);

router
  .route("/:id")
  .get(validator.getVaildator, controller.getProduct)
  .patch(
    authenticatedChecker,
    authorizedChecker("admin"),
    validator.updateVaildator,
    controller.updateProduct,
  )
  .delete(
    authenticatedChecker,
    authorizedChecker("admin"),
    validator.deleteVaildator,
    controller.deleteProduct,
  );

module.exports = router;
