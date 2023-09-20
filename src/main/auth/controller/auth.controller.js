var authService = require("../service/auth.service");

const signin = async (req,res)=>{
    var param = {
        userName : req.body.userName,
        password : req.body.password
    }
    try {
        var user = await authService.getLoginUserInfo(param);
        var data = {};
        data.message = "Login Successfully!"
        return res.status(200).json({data:data})
    } catch (error) {
        
    }
}