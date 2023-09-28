var userService = require("../service/user.service");

exports.verifySignup = async (req,res,next)=>{
    if((typeof req.body.userName != "undefined") && (typeof req.body.password != "undefined") && (typeof req.body.email != "undefined")){
        if((req.body.userName != "") && (req.body.password != "") && (req.body.email != "")){
            var _user = await userService.getUserByUsername(req.body.userName);
            if(_user){
                 return res.status(500).json({data:{message : "The username already exists"}})
            }else{
                _user = await userService.getUserByEmail(req.body.email);
                if(_user) return res.status(500).json({data:{message : "The email already exists"}})
                next();
            }
        }else{  
            var message = "";
            if((req.body.userName === "")) message += "'\n'The username is required";
            if((req.body.password === "")) message += "'\n'The password is required";
            if((req.body.email === "")) message += "'\n'The email is required";

            return res.status(400).json({data:{message : message}});
        }
    }else{
        var message = "";
        if((typeof req.body.userName === "undefined")) message += "'\n'The username is required";
        if((typeof req.body.password === "undefined")) message += "'\n'The password is required";
        if((typeof req.body.email === "undefined")) message += "'\n'The email is required";

        return res.status(400).json({data:{message : message}});
    }
}

exports.verifyRoles = async  (req,res,next)=>{
    console.log("req.body.roles ",req.body.roles);
    if((typeof req.body.roles === "undefined" ) || (req.body.roles.length === 0)) return res.status(400).json({data:{message : "Roles are required !"}});
    var param = [];
    req.body.roles.map(e=> param.push(e.id))
    console.log("param",param);
    var _roles = await userService.getRolesByIds(param);
    var errRoles = "";
    for(let i = 0; i <  req.body.roles.length;i++){
        let filteredExistedRole = _roles.filter(k => k.id === req.body.roles[i].id);
        if(filteredExistedRole.length === 0) errRoles += req.body.roles[i].name +", ";
    }
    if(errRoles.length > 0){
        errRoles =  errRoles.substring(0,errRoles.length - 2)
        let message = errRoles.indexOf(',') === -1 ? "The role " : "The roles ";
        return res.status(500).json({data:{ message : message+errRoles +" does not exist !"}});
    }else{
        req.body.roles = _roles;
        next();
    }
}