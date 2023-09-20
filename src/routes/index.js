var router = require("express").Router();

module.exports = app =>{
    router.get("/",(req,res)=>{
        res.send("da vo dc hang cop Bing House");
    });

    //module routes
    router.use("/userMngt", require(__dirname + "/user.routes.js"));

    app.use("/bh_dashboard/api", router);
}