var router = require("express").Router();
var {verifySignup,verifyRoles} = require("../main/user/middleware/user.middleware");
var userController = require("../main/user/controller/user.controller");
// var multerStorage = require("../config/upload")

var multer = require("multer");
var storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,appRoot +"/uploadfile");
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    }
});
var upload = multer({storage:storage})
router.post("/signup",userController.createUser);

module.exports = router;