const express = require("express");
const controller = require("../controllers/product_controller");
const validator = require("../helpers/validation_layer/product_validator");


const router = express.Router();

router
  .route("/")
  .post(validator.postValidator, controller.createProduct)
  .get(controller.getProducts);

router
  .route("/:id")
  .get(validator.getVaildator, controller.getProduct)
  .patch(validator.updateVaildator, controller.updateProduct)
  .delete(validator.deleteVaildator, controller.deleteProduct);


module.exports = router;
