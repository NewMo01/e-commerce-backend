
const express = require('express');
const controller = require('../controllers/user_controller')
const tokenChecker = require('../middlewares/token_checker')
const roleChecker = require('../middlewares/role_checker')
const constants = require('../helpers/constants')

const router = express.Router()

router.route('/')
        .get(tokenChecker,roleChecker(constants.MANAGER),controller.getUsers)

router.route('/register')
        .post(controller.registerUser)
        
router.route('/login')
        .post(controller.loginUser)

router.route('/:id')
        .patch(tokenChecker,roleChecker(constants.MANAGER),controller.updateUser)
        .delete(tokenChecker,roleChecker(constants.MANAGER),controller.removeUser)







module.exports = router