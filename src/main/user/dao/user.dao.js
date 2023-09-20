var {UserEntity, RoleEntity, Sequelize} = require("../../../config/database");
var {Op} = Sequelize;

const createUser = async param =>{
    return await UserEntity.create(param);
}

const getLoginUserInfo = async param =>{
    return await UserEntity.findOne({
        where : {
            user_name : param.user_name,
            password : param.password
        }
    })
}

const getUserByUsername = async user_name =>{
    return await UserEntity.findOne({
        where : {
            user_name : user_name
        }
    })
}

const getUserByEmail = async email =>{
   return await UserEntity.findOne({
        where : {
            email : email
        }
   })
}

const getRolesByNames = async roleNames =>{
    return await RoleEntity.findAll({
        where : {
            name : {
                [Op.or] : roleNames
            }
        }
    })
}

const getRolesByIds = async ids =>{
    return await RoleEntity.findAll({
        where : {
            id : {
                [Op.or] : ids
            }
        }
    })
}
module.exports = {
    createUser : createUser,
    getLoginUserInfo : getLoginUserInfo,
    getUserByUsername : getUserByUsername,
    getUserByEmail : getUserByEmail,
    getRolesByNames : getRolesByNames,
    getRolesByIds : getRolesByIds
}