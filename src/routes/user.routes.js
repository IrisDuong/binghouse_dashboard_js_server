var router = require("express").Router();
var {verifySignup,verifyRoles} = require("../main/user/middleware/user.middleware");
var userController = require("../main/user/controller/user.controller");

router.post("/signup",userController.createUser);

module.exports = router;