const express = require("express");
const controller = require("../controllers/subcategory_controller");
const validation = require("../helpers/validation_layer/subcategory_validator");
const authenticatedChecker = require("../middlewares/authentication_middleware");
const authorizedChecker = require("../middlewares/authorization_middleware");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(controller.createFilterObject, controller.getSubCategories)
  .post(
    authenticatedChecker,
    authorizedChecker("admin"),
    controller.setCatIdFromParamsToBody,
    validation.postValidator,
    controller.createSubCategory,
  );

router
  .route("/:id")
  .get(validation.getValidator, controller.getSubCategory)
  .patch(
    authenticatedChecker,
    authorizedChecker("admin"),
    validation.updateValidator,
    controller.updateSubCategory
  )
  .delete(
    authenticatedChecker,
    authorizedChecker("admin"),
    validation.deleteValidator,
    controller.deleteSubCategory
  );

module.exports = router;
