var router = require("express").Router();

module.exports = app =>{
    //module routes
    router.use("/userMngt", require(__dirname + "/user.routes.js"));
    router.use("/auth", require(__dirname + "/auth.routes.js"));
    router.use("/basicInfo", require(__dirname + "/basic.routes.js"))
    // router.use("/basicInfo",(req,res)=>{
        
    //     console.log("basicInfo");
    //     res.end()
    // });
    router.get("/",(req,res)=>{
        console.log("da vo dc hang cop CAI Bing House");
        // res.sendFile("../src/public/build/index.html")
    });

    app.use(router);
}