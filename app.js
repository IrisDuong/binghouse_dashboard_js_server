const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userService = require("./src/main/user/service/userRegMngtService");

require("dotenv").config();
const sequelize = require("./src/config/databaseconn");

/** load config */
var appPath = process.env.APP_PATH;
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;
const SECRET_KEY = process.env.SECRET_KEY;

/** Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret : SECRET_KEY,
    saveUninitialized:true,
    resave : true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});
app.post("/login",passport.authenticate("local",{
    successRedirect : "/",
    failureRedirect : "/loginfalure",
    // failureFlash : true
}),(req,res)=>{

    console.log("show session USER after login",req.session);
});
passport.use("local",new LocalStrategy({passReqToCallBack:true},(username, password, done,req)=>{
    console.log("start login");
    console.log("username",username);
    console.log("password",password);
 loginAttempt();
 async function loginAttempt(){
    
    userService.getLoginUserInfo({user_name:username,password:password})
    .then(result=>{
        // req.session.cookie.maxAge = 10*60*1000;
        console.log("login thanh cong",result.dataValues);
        return done(null,result.dataValues)
    })
    .catch(error=> done(null,error))
 }
}));
app.get("/",(req,res,next)=>{
    // console.log("req",req);
    if(req.isAuthenticated()){
        console.log("trang chu bing house");
        res.send("trang chu")
    }else{
        res.send("Chua dang nhap")
    }
});
app.get("/loginfalure",(req,res,next)=>{
    console.log("loginfalure");
    res.end()
   
});
app.use(require(__dirname+"/src/router"));
/**Init database */
sequelize.sync().then(()=>{
    console.log("All tables were created successfully");
}).catch((error) => {
    console.error('Unable to create table : ', error);
 });

/** Start server */
app.listen(PORT,HOST,()=>{
    console.log(`server is running at port ${PORT}`);
})