const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require("./src/config/databaseconn")

var appPath = process.env.APP_PATH;
console.log("appPath",appPath);
app.use(appPath, require(__dirname+"/src/router"));

/** Start server */
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;

sequelize.sync().then(()=>{
    console.log("All tables were created successfully");
}).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
app.listen(PORT,HOST,()=>{
    console.log(`server is running at port ${PORT}`);
})