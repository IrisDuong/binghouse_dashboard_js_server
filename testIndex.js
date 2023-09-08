var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var {connection,roleEntity,ROLES} = require("./src/config/database");

require("dotenv").config();
var app = express();
var corsOpt = {
    origin : "http://localhost:3000"
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors(corsOpt));


app.get("/",(req,res)=>{
    res.send("Test JWT with Nodejs and Passportjs")
})
require("./src/main/test/routes/auth.routes")(app);
require("./src/main/test/routes/user.routes")(app);

connection.sync({alter:true}).then(()=>{
    console.log("---- testIndex--------- All tables were created successfully");
    roleEntity.findAll()
    .then(roles=>{
        // if(!roles){
        //     roleEntity.create({
        //         id:1,
        //         name : "user"
        //     });
        //     roleEntity.create({
        //         id:2,
        //         name : "moderator"
        //     });
        //     roleEntity.create({
        //         id:3,
        //         name : "admin"
        //     });
        // }
        for(let i = 0; i <  ROLES.length; i++){
            var duplicatedRole = roles.filter(k=> k.name == ROLES[i]);
            if(duplicatedRole.length > 0) break;
            
            console.log("chua co quyen",ROLES[i]);
            roleEntity.create({
                        name : ROLES[i]
            });
        }
    })
    .catch(error=> console.log(error))
   
}).catch((error) => {
    console.error('---- testIndex--------- Unable to create table : ', error);
 });
var server = app.listen(process.env.PORT || 3001,()=>{
    var port = server.address().port;
    console.log(`App started at port : ${port}`)
})