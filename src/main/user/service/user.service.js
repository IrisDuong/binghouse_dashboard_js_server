var userDao = require("../dao/user.dao");

const createUser = async param =>{
    var _param = {
        user_name : param.userName,
        password : param.password,
        email : param.email,
        full_name : param.fullName,
        dob : param.dob,
        address : param.address,
        avatar_path : param.avatarPath
    }
    return await userDao.createUser(_param);
}

const getLoginUserInfo = async param =>{
    var _param = {
        user_name : param.userName,
        password : param.password
    }

    return await userDao.getLoginUserInfo(_param);
}

const getUserByUsername = async userName =>{
    return await userDao.getUserByUsername(userName);
}

const getUserByEmail = async email =>{
    return await userDao.getUserByEmail(email);
}

const getRolesByNames = async roleNames =>{
    return await userDao.getRolesByNames(roleNames)
}

const getRolesByIds = async ids =>{
    return await userDao.getRolesByIds(ids)
}
module.exports = {
    createUser : createUser,
    getLoginUserInfo : getLoginUserInfo,
    getUserByUsername : getUserByUsername,
    getUserByEmail : getUserByEmail,
    getRolesByNames : getRolesByNames,
    getRolesByIds : getRolesByIds
}