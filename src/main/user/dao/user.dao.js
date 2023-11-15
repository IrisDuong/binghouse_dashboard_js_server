var {UserEntity, RoleEntity, Sequelize} = require("../../../config/database");
var {Op} = Sequelize;

const createUser = async param =>{
    return await UserEntity.create(param);
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
    console.log("ids",ids);
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
    getUserByUsername : getUserByUsername,
    getUserByEmail : getUserByEmail,
    getRolesByNames : getRolesByNames,
    getRolesByIds : getRolesByIds
}