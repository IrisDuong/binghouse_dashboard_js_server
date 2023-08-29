const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./src/config/databaseconn")

/** load config */
var appPath = process.env.APP_PATH;
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;

/** Middle ware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(appPath, require(__dirname+"/src/router"));

sequelize.sync().then(()=>{
    console.log("All tables were created successfully");
}).catch((error) => {
    console.error('Unable to create table : ', error);
 });

/** Start server */

app.listen(PORT,HOST,()=>{
    console.log(`server is running at port ${PORT}`);
})