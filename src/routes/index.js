var router = require("express").Router();

module.exports = app =>{
    // router.get("/",(req,res)=>{
    //     console.log("da vo dc hang cop CAI Bing House");
    //     res.sendFile("../src/public/build/index.html")
    // });

    //module routes
    router.use("/userMngt", require(__dirname + "/user.routes.js"));
    router.use("/auth", require(__dirname + "/auth.routes.js"));
    
    app.use(router);
}