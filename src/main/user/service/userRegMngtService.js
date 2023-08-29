const userRegMngtDao = require("../dao/userRegMngtDao");
const Q = require("q");

exports.getListUsers = () =>{
    var defer = Q.defer();
    userRegMngtDao.getListUsers()
    .then(result=>{
        defer.resolve(result);
    })
    .catch(error=> defer.reject(error))
    return defer.promise
}