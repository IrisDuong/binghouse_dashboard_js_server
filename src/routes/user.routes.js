var router = require("express").Router();
var {verifySignup,verifyRoles} = require("../main/user/middleware/user.middleware");
var userController = require("../main/user/controller/user.controller");
var multerStorage = require("../config/upload")

router.post("/signup",[multerStorage.single("file")],userController.createUser);

module.exports = router;