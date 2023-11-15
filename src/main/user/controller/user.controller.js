var userService = require("../service/user.service");
var {Storage} = require("@google-cloud/storage");
var {format} = require("util");
var processFile = require("../../../config/google-cloud.upload");
const { error } = require("console");
const createUser = async (req,res)=>{
    var statusCode = 201;
    var data = {};
    try {
        var _user = await userService.createUser(param);
        await _user.setTb_mba_roles(req.body.roles)
        statusCode = 201;
        data.message = "User Registration successfully !"
        data.user = _user;
    } catch (error) {z
        statusCode = 500;
        data.message = "Failed ! Error in User Registration !"
    }
    res.status(statusCode).json(data);
}

module.exports = {
    createUser : createUser
}