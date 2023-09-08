var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
require("dotenv").config();
var sequelize = require("./src/config/databaseconn");
var userRole = require("./src/main/user/entity/userRoleEntity")
/** load config */
var appPath = process.env.APP_PATH;
var PORT = process.env.PORT || 3001;
var HOST = process.env.HOST;
var SECRET_KEY = process.env.SECRET_KEY;

/** Middleware */
app.use(session({
    secret  : SECRET_KEY,
    resave : true,
    saveUninitialized  :true,
    cookie : {
        _expires : 180000
    }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());


app.use(require(__dirname+"/src/router"));

/**Init database */
sequelize.sync({force:true}).then(()=>{
    // console.log("All tables were created successfully");
}).catch((error) => {
    // console.error('Unable to create table : ', error);
 });

/** Start server */
app.listen(PORT,HOST,()=>{
    // console.log(`server is running at port ${PORT}`);
})