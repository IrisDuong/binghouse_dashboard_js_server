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
    var refreshToken = await authDao.createRefreshToken(param);
    return refreshToken;
}

const getLoginUserInfo = async param =>{
    try {
        var _user = await authDao.getLoginUserInfo(
            { 
                user_name : param.userName,
                password : param.password
            }
        )
        var user = {
            id : _user.id,
            userName : _user.user_name,
            email : _user.email,
            fullName : _user.full_name,
            address : _user.address,
            dob : _user.dob,
            avatarPath : _user.avatar_path,

        }
        return user;
    } catch (error) {
        return error;
    }
}

const createJwtToken = user =>{
    var secretKey = process.env.JWT_SECRET_KEY;
    var jwtExpTime = process.env.JWT_EXPIRED_TIME;
    return jwt.sign(
        {userId : user.id},
        secretKey,
        {
            algorithm : "HS256",
            expiresIn  :jwtExpTime,
            allowInsecureKeySizes : true
        }
    )
}

module.exports = {
    createRefreshToken : createRefreshToken,
    getLoginUserInfo : getLoginUserInfo,
    createJwtToken : createJwtToken
}