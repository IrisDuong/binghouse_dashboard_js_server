const express = require("express");
const cors = require("cors");
var path = require("path")
const app = express();
require("dotenv").config();
require(__dirname + "/src/config/database.js");
global.appRoot = path.resolve(__dirname);

/**middleware using */
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use(express.static(__dirname+"/src/public/build/"))
app.use(cors({
    origin : "http://localhost:3000"
}))
require(__dirname + "/src/routes")(app)

//START SERVER
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`=============================Server of Bing House dashboard is running at port ${PORT}=============================`);
})


