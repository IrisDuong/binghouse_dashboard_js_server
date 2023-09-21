var router = require("express").Router();
var {validateLogin} = require("../main/auth/middleware/auth.middleware");
var authController = require("../main/auth/controller/auth.controller")

router.post("/login", validateLogin,authController.login);

module.exports = router;