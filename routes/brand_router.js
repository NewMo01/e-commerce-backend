

const express = require('express')
const validator = require('../helpers/validation_layer/brand_validator')
const controller = require('../controllers/brand_controller')


const router = express.Router()


router.route('/')
    .get(controller.getBrands)
    .post(validator.postValidator, controller.createBrand)

router.route('/:id')
    .get(validator.getValidator, controller.getBrand)
    .patch(validator.updateValidator, controller.updateBrand)
    .delete(validator.deleteValidator, controller.deleteBrand)

module.exports = router