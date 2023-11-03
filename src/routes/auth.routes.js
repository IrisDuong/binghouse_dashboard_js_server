const router = require("express").Router();
const {validateLogin} = require("../main/auth/middleware/auth.middleware");
const authController = require("../main/auth/controller/auth.controller")
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");

router.post("/login", validateLogin,authController.login);

// GOOGLE AUTH Login
const GOOGLE_CLIENT_ID = "626337975103-qebj6g1pqjocod9mkqipaaqtf77vo7rb.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
var googleProfile;
passport.use(new GoogleStrategy({
    clientID : GOOGLE_CLIENT_ID,
    clientSecret : GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:3001/authorization/google-auth/callback"
    }
    ,(accessToken, refreshToken, profile, done)=>{
        googleProfile = profile;
        return done(null, googleProfile);
    }
))
router.get("/googleLogin",(req,res,next)=>{
    console.log("Move to Gmail login");
    res.redirect("/authorization/google-auth")
})
router.get("/google-auth",passport.authenticate("google",{scope : ["profile","email"]}));
router.get("/google-auth/callback", passport.authenticate("google",{
    // failureRedirect : "http://localhost:3000/auth/login",
    // successRedirect : "http://localhost:3000"
    failureRedirect : "/authorization/google-auth/error",
}),(req,res)=> res.redirect("/authorization/google-auth/success"))
router.get("/google-auth/success", (req,res)=>{
   res.json({
        message : "Google Auth Succesfully !",
        data : googleProfile
   })
})
router.get("/google-auth/error", (req,res)=>{
    res.json({message:"Google Auth Failed !"})
})
module.exports = router;