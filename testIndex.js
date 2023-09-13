var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var {graphqlHTTP} = require("express-graphql");
var {GraphQLSchema} = require("graphql");
var {queryType} = require("./src/main/test/graphql/query");
var {connection,roleEntity,ROLES} = require("./src/config/database");

require("dotenv").config();
var app = express();

/**GrapHQL */
var schema = new GraphQLSchema({query : queryType});
app.use("/graphql",graphqlHTTP({
    schema : schema,
    graphiql : true
}))
var corsOpt = {
    origin : "http://localhost:3000"
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors(corsOpt));


app.get("/",(req,res)=>{
    res.send("Test JWT with Nodejs and Passportjs")
});
function md1(req,res,next){
    console.log("--------- name from req BEFORE IS  = "+req.body.name);
    req.body.name = "bang";
    next()
}
app.post("/testmiddleware",md1,(req,res)=>{
    
    console.log("--------- name from req AFTER  IS  = "+req.body.name);
    res.end()
})
require("./src/main/test/routes/auth.routes")(app);
require("./src/main/test/routes/user.routes")(app);

connection.sync({alter:true}).then(()=>{
    console.log("---- testIndex--------- All tables were created successfully");
    roleEntity.findAll()
    .then(roles=>{
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