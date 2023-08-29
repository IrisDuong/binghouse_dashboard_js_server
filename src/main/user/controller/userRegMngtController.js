const router = require("express").Router();
const userRegMngtService = require("../service/userRegMngtService");

router.get("/",(req,res)=>{
    res.json({message:"trang quan ly nguoi dung"})
})

router.get("/users",(req,res)=>{
    userRegMngtService.getListUsers()
    .then(result=>{
        console.log("result in controller",result);
        res.json({listUser:result});
    })
    .catch(error=> {
        res.send("loi lay list user")
    })
})

module.exports = router;