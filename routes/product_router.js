
const express = require('express');
const controller = require('../controllers/product_controller')
const tokenChecker = require('../middlewares/token_checker')
const roleChecker = require('../middlewares/role_checker')
const constants = require('../helpers/constants')

const router = express.Router()

router.route('/')
    .get(controller.getProducts)
    .post(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.addProduct)

router.route('/:productId')
    .get(controller.getProductById)
    .patch(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.updateProduct)
    .delete(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.removeProduct)




module.exports = router