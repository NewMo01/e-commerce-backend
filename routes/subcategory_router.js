
const express = require('express')
const controller = require('../controllers/subcategory_controller')
const validation = require('../helpers/validation_layer/subcategory_validator')

const router = express.Router({mergeParams:true})


router.route('/')
    .get(controller.getSubCategories)
    .post(controller.setCatIdFromParamsToBody, validation.postValidator, controller.createSubCategory)
    
  
router.route('/:id')
    .get(validation.getValidator, controller.getSubCategory)
    .patch(validation.updateValidator, controller.updateSubCategory)
    .delete(validation.deleteValidator, controller.deleteSubCategory)

module.exports = router