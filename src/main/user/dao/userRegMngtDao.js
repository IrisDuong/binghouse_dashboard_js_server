
const Q = require("q");
const User = require("../entity/userEntity");

exports.getListUsers = ()=>{
    var defer = Q.defer();
    User.findAll()
    .then(result=>{
        defer.resolve(result);
    })
    .catch(error=> defer.reject(error));
    return defer.promise
}