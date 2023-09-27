var authService = require("../service/auth.service");

const login = async (req,res)=>{
    console.log("req.body",req.body);
    var param = {
        userName : req.body.userName,
        password : req.body.password
    }
    var message = "";
    var user = await authService.getLoginUserInfo(param);
    if(user){
        message = "Login Successfully!";
        user.accessToken = authService.createJwtToken(user);
        var refreshToken = await authService.createRefreshToken(user);
        user.refreshToken = refreshToken.token;
        return res.status(200).json({message:message,user:user});
    }else{
        data.message = "Login Failed !";
        res.status(500).json({message:message})
    }
   
}

module.exports = {
    login : login
}