const express = require("express");
const authenticatedChecker = require("../middlewares/authentication_middleware");
const authorizedChecker = require("../middlewares/authorization_middleware");
const validator = require("../helpers/validation_layer/brand_validator");
const controller = require("../controllers/brand_controller");

const router = express.Router();

router
  .route("/")
  .get(controller.getBrands)
  .post(
    authenticatedChecker,
    authorizedChecker("admin"),
    validator.postValidator,
    controller.createBrand,
  );

router
  .route("/:id")
  .get(validator.getValidator, controller.getBrand)
  .patch(
    authenticatedChecker,
    authorizedChecker("admin"),
    validator.updateValidator,
    controller.updateBrand,
  )
  .delete(
    authenticatedChecker,
    authorizedChecker("admin"),
    validator.deleteValidator,
    controller.deleteBrand,
  );

module.exports = router;
