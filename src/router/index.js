const router = require("express").Router();

router.use("/userRegMngt",require("../main/user/controller/userRegMngtController"));

router.get("/",(req,res)=>{
    console.log("trang chu bing house");
    res.end()
});

module.exports = router;