const router = require("express").Router();

router.use("/userRegMngt",require("../main/user/controller/userRegMngtController"));
router.use("/auth", require("../main/auth/controller/authController"));

// router.get("/",(req,res,next)=>{
//     // console.log("req",req);
//     if(req.isAuthenticated()){
//         console.log("trang chu bing house");
//         res.send("trang chu")
//     }else{
//         res.send("Chua dang nhap")
//     }
// });

module.exports = router;