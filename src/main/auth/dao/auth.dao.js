
var {RefreshTokenEntity,UserEntity} = require("../../../config/database");

const createRefreshToken = async  param =>{
    return await RefreshTokenEntity.create(param);
}

const getLoginUserInfo = async param =>{
    return await UserEntity.findOne({
        where : {
            user_name : param.user_name,
            password : param.password
        }
    })
}
module.exports = {
    createRefreshToken : createRefreshToken,
    getLoginUserInfo  : getLoginUserInfo
}