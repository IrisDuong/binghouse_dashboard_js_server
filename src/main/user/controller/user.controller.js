var userService = require("../service/user.service");

const createUser = async (req,res)=>{
    var param = {
        userName : req.body.userName,
        password : req.body.password,
        email : req.body.email,
        fullName : req.body.fullName,
        dob : req.body.dob,
        address : req.body.address,
        avatarPath : req.body.avatarPath
    }
    var statusCode = 500;
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