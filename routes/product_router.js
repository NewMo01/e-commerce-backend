
const express = require('express');
const controller = require('../controllers/product_controller')

const router = express.Router()

router.route('/')
    .get(controller.getProducts)




module.exports = router