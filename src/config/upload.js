
var Multer = require("multer");

var storage  = Multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"../server/uploadfile")
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

module.exports = Multer({storage:storage});