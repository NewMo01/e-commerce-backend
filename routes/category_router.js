const express = require("express");
const controller = require("../controllers/category_controller");
const categoryValidator = require("../helpers/validation_layer/category_validator");
const SubCategoryRouter = require('../routes/subcategory_router')

const router = express.Router();

router.use('/:catId/subcategories',SubCategoryRouter)

router
  .route("/")
  .get(controller.getCategories)
  .post(categoryValidator.postValidator, controller.createCategory);

router
  .route("/:id")
  .get(categoryValidator.getValidator, controller.getCategory)
  .patch(categoryValidator.updateValidator, controller.updateCategory)
  .delete(categoryValidator.deleteValidator, controller.deleteCategory);



module.exports = router;
