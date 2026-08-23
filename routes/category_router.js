const express = require("express");
const authenticatedChecker = require("../middlewares/authentication_middleware");
const authorizedChecker = require("../middlewares/authorization_middleware");
const controller = require("../controllers/category_controller");
const categoryValidator = require("../helpers/validation_layer/category_validator");
const SubCategoryRouter = require("../routes/subcategory_router");
const ProductRouter = require("../routes/product_router");

const router = express.Router();

router.use("/:catId/subcategories", SubCategoryRouter);
router.use("/:catId/products", ProductRouter);

router
  .route("/")
  .get(controller.getCategories)
  .post(
    authenticatedChecker,
    authorizedChecker("admin"),
    categoryValidator.postValidator,
    controller.createCategory,
  );

router
  .route("/:id")
  .get(categoryValidator.getValidator, controller.getCategory)
  .patch(
    authenticatedChecker,
    authorizedChecker("admin"),
    categoryValidator.updateValidator,
    controller.updateCategory,
  )
  .delete(
    authenticatedChecker,
    authorizedChecker("admin"),
    categoryValidator.deleteValidator,
    controller.deleteCategory,
  );

module.exports = router;
