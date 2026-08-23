const express = require("express");
const controller = require("../controllers/auth_controller");
const validator = require("../helpers/validation_layer/user_validator");

const router = express.Router();

router.post("/signup", validator.signupValidator, controller.signup);
router.post("/login", validator.loginValidator, controller.login);
router.post("/logout", controller.logout);
router.post("/refresh-token", controller.updateAccessToken);

module.exports = router;
