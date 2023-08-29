const router = require("express").Router();
const userRegMngtService = require("../service/userRegMngtService");

router.get("/",(req,res)=>{
    res.json({message:"trang quan ly nguoi dung"})
})

router.post("/users",(req,res)=>{
    var param = req.body;
    console.log("param get users",param);
    userRegMngtService.getListUsers(param)
    .then(result=>{
        // console.log("result in controller",result);
        res.json({listUser:result});
    })
    .catch(error=> {
        res.send("loi lay list user")
    })
})

module.exports = router;