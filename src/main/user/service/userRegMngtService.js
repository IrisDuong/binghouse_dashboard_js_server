const userRegMngtDao = require("../dao/userRegMngtDao");
const Q = require("q");

exports.getListUsers = (param) =>{
    var defer = Q.defer();
    userRegMngtDao.getListUsers(param)
    .then(result=>{
        defer.resolve(result);
    })
    .catch(error=> defer.reject(error))
    return defer.promise
}