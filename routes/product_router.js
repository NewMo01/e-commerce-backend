const express = require("express");
const controller = require("../controllers/product_controller");
<<<<<<< HEAD
const validator = require("../helpers/validation_layer/product_validator");
=======
const tokenChecker = require("../middlewares/token_checker");
const roleChecker = require("../middlewares/role_checker");
const constants = require("../helpers/constants");
const upload = require("../helpers/uploader");
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b

const router = express.Router();

router
  .route("/")
<<<<<<< HEAD
  .post(validator.postValidator, controller.createProduct)
  .get(controller.getProducts);

router
  .route("/:id")
  .get(validator.getVaildator, controller.getProduct)
  .patch(validator.updateVaildator, controller.updateProduct)
  .delete(validator.deleteVaildator, controller.deleteProduct);
=======
  .get(controller.getProducts)
  .post(
    tokenChecker,
    roleChecker(constants.MANAGER, constants.ADMIN),
    upload.fields([
      { name: "previewImg", maxCount: 1 },
      { name: "imgs", maxCount: 4 },
    ]),
    controller.addProduct,
  );

router
  .route("/:productId")
  .get(controller.getProductById)
  .patch(
    tokenChecker,
    roleChecker(constants.MANAGER, constants.ADMIN),
    upload.fields([
      { name: "previewImg", maxCount: 1 },
      { name: "imgs", maxCount: 4 },
    ]),
    controller.updateProduct,
  )
  .delete(
    tokenChecker,
    roleChecker(constants.MANAGER, constants.ADMIN),
    controller.removeProduct,
  );
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b

module.exports = router;
