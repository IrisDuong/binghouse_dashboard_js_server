var router = require("express").Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var userRegMngtService = require("../../user/service/userRegMngtService");

passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});


router.get("/loginFailed",(req,res)=>{
    res.send("login failed")
})
router.post("/login",passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "auth/loginFailed"
}))

passport.use("local", new LocalStrategy((username,password,done)=>{
    var param =  {
                    userName:username
                   ,password:password
                 }
    userRegMngtService.getLoginUserInfo(param)
    .then(result=>{
        if(result){
            return done(null,result.dataValues)
        }else{
            return done(null,{message:"login failed"})
        }
    })
    .catch(error=>{
       return done(error)
    })
}));
module.exports = router;