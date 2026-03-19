

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
    .patch(tokenChecker,roleChecker(constants.MANAGER),controller.updateCategory)
    .delete(tokenChecker,roleChecker(constants.MANAGER),controller.removeCategory)





module.exports = router