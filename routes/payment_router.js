
const express = require('express');
const controller = require('../controllers/payment_controller');

const router = express.Router()

router.post('/create-checkout-session', controller.createCheckoutSession);
router.post('/checkout-success', controller.checkoutSuccess);

module.exports = router