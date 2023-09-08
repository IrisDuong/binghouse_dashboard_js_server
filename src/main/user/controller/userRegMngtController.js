const router = require("express").Router();
const userRegMngtService = require("../service/userRegMngtService");

router.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        console.log("req.session : ",req.session);
        res.json({message:"trang quan ly nguoi dung"})
    }else{
        res.send("Vui long dang nhap truoc khi vo trang quan ly user")
    }
})

router.post("/users",(req,res)=>{
    if(req.isAuthenticated()){
        console.log("logged user ",req.session.passport.user);
        var param = req.body;
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
    userRegMngtService.getLoginUserInfo(param)
    .then(result=>{
        // res.json({listUser:result});
    })
    .catch(error=> {
        res.send("loi  getLoginUserInfo")
    })
})

module.exports = router;