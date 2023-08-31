
const Q = require("q");
const User = require("../entity/userEntity");
const { Sequelize,Op } = require("sequelize");

exports.getListUsers = (param)=>{
    var defer = Q.defer();
    User.findAll({
        // where: Sequelize.or(
        //     {first_name:param.first_name},
        //     {last_name:param.last_name},
        //     {email:param.email}
        // )
        where:{
            first_name :{
                [Op.or]:{
                    [Op.eq]:param.first_name,
                    [Op.ne]:""
                }
            },
            last_name :{
                [Op.or]:{
                    [Op.eq]:param.last_name,
                    [Op.ne]:""
                }
            },
            address :{
                [Op.or]:{
                    [Op.eq]:param.address,
                    [Op.ne]:""
                }
            }
        }
    })
    .then(result=>{
        defer.resolve(result);
    })
    .catch(error=> defer.reject(error));
    return defer.promise;
};

exports.getLoginUserInfo = param =>{
    var defer = Q.defer();
    User.findOne({
        where: {
            user_name : param.user_name,
            password : param.password
        }
    })
    .then(result =>{
        defer.resolve(result);
    })
    .catch(error=> defer.reject(error));
    return defer.promise;
}