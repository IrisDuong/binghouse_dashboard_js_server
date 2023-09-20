var uuid  = require("uuid");
var jwt  = require("jsonwebtoken");
var authDao = require("../dao/auth.dao");
require("dotenv").config();

var {v4 : uuid4} = uuid;

const createRefreshToken = async user =>{
    var newToken = uuid4();
    var expiredDate = new Date();
    var jwtExp = process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME;
    expiredDate.setSeconds(expiredDate.getSeconds() + jwtExp);
    var param = {
        token : newToken,
        exp_date : expiredDate,
        user_id :  user.id
    }
    return await authDao.createRefreshToken(param);
}

const getLoginUserInfo = async param =>{
    return await authDao.getLoginUserInfo(
        { 
            user_name : param.userName,
            password : param.password
        }
    )
}

const createJwtToken = user =>{
    var secretKey = process.env.JWT_SECRET_KEY;
    var jwtExpTime = process.env.JWT_EXPIRED_TIME;
    return jwt.sign(
        {userId : user.id},
        secretKey,
        {
            algorithm : "HS256",
            expiresIn  :JWT_EXPIRED_TIME,
            allowInsecureKeySizes : true
        }
    )
}

module.exports = {
    createRefreshToken : createRefreshToken,
    getLoginUserInfo : getLoginUserInfo,
    createJwtToken : createJwtToken
}