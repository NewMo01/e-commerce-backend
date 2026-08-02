<<<<<<< HEAD
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
=======


const express = require('express');
const controller = require('../controllers/category_controller')
const tokenChecker = require('../middlewares/token_checker')
const roleChecker = require('../middlewares/role_checker')
const constants = require('../helpers/constants')
const upload = require('../helpers/uploader')


const router = express.Router()

router.route('/')
    .get(controller.getCategories)
    .post(tokenChecker,roleChecker(constants.MANAGER),upload.single('image'),controller.addCategory)
router.route('/:catId')
    .get(controller.getCategory)
    .patch(tokenChecker,roleChecker(constants.MANAGER),upload.single('image'),controller.updateCategory)
    .delete(tokenChecker,roleChecker(constants.MANAGER),controller.removeCategory)





module.exports = router
>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
