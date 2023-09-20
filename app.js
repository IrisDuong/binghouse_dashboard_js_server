const express = require("express");
const app = express();
require("dotenv").config();
require(__dirname + "/src/config/database.js");
app.use(express.json());
app.use(express.urlencoded({extended : true}))
require(__dirname + "/src/routes")(app)
//START SERVER
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`=============================Server of Bing House dashboard is running at port ${PORT}=============================`);
})


