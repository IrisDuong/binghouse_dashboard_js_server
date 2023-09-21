var authService = require("../service/auth.service");

const login = async (req,res)=>{
    var param = {
        userName : req.body.userName,
        password : req.body.password
    }
    var data = {};
        var user = await authService.getLoginUserInfo(param);
        if(user){
            data.message = "Login Successfully!";
            data.token = authService.createJwtToken(user);
            var refreshToken = await authService.createRefreshToken(user);
            data.refreshToken = refreshToken.token;
            delete user.id;
            data.user = user;
            return res.status(200).json({data:data})
        }else{
            data.message = "Login Failed !";
            res.status(500).json({data:data})
        }
   
}

module.exports = {
    login : login
}