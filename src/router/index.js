const router = require("express").Router();

router.use("/userRegMngt",require("../main/user/controller/userRegMngtController"));
router.use("/auth", require("../main/auth/controller/authController"));

router.get("/",(req,res,next)=>{
        if(req.isAuthenticated()){
            console.log("req.session.pasport.user",req.session.passport.user);
            res.send(`Welcome to Bing house homepage`)
        }else{
            res.send("Please signin")
        }
});

module.exports = router;