const express = require("express");
const cors = require("cors");
const path = require("path")
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const app = express();

require("dotenv").config();
require(__dirname + "/src/config/database.js");
global.appRoot = path.resolve(__dirname);

/**middleware using */

// app.use(express.static(__dirname+"/src/public/build/"))
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : "SECRET"
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

/**
 * passport serializeUser & deserializeUser configuration
 */
passport.serializeUser((user, cb)=>{
    cb(null, user)
});
passport.deserializeUser((user,cb)=>{
    cb(null, user);
})



/**
 * Routes
 */
require(__dirname + "/src/routes")(app)
//START SERVER
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`=============================Server of Bing House dashboard is running at port ${PORT}=============================`);
})