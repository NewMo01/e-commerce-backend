const express = require('express');
const controller = require('../controllers/order_controller')
const tokenChecker = require('../middlewares/token_checker')
const roleChecker = require('../middlewares/role_checker')
const constants = require('../helpers/constants')

const router = express.Router()

router.route('/')
    .get(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.getOrders)
    .post(controller.createOrder)

router.route('/cancel/:orderId')
    .patch(controller.cancelOrder)

router.route('/:orderId')
    .get(controller.getOrderById)
    .patch(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.updateOrder)
    .delete(tokenChecker,roleChecker(constants.MANAGER,constants.ADMIN),controller.removeOrder)




module.exports = router