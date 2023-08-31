const router = require("express").Router();
const userRegMngtService = require("../service/userRegMngtService");

router.get("/",(req,res)=>{
    res.json({message:"trang quan ly nguoi dung"})
})

router.post("/users",(req,res)=>{
    if(req.isAuthenticated()){

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
    }else{

        res.send("hay dang nhap truoc khi lay lis user")
    }
})

router.post("/getLoginUserInfo",(req,res)=>{
    var param = req.body;
    console.log("param getLoginUserInfo",param);
    userRegMngtService.getLoginUserInfo(param)
    .then(result=>{
        console.log("result in getLoginUserInfo controller",result.dataValues.last_name);
        // res.json({listUser:result});
    })
    .catch(error=> {
        res.send("loi  getLoginUserInfo")
    })
})

module.exports = router;