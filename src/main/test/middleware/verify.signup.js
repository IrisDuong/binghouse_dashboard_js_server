var {userEntity,ROLES}  = require("../../../config/database");
checkDuplicateUsernameOrEmail = (req,res,next)=>{
    var param = req.body;
    userEntity.findOne({
        where:{
            user_name : param.userName
        }
    })
    .then(result=>{
        if(result){
            res.status(400).send({
                message: "Failed! Username is already in use!"
                });
                return;
        }

        userEntity.findOne({
            where:{
                email : param.email
            }
        })
        .then(result=>{
            if(result){
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
}

checkRolesExisted  = (req,res,next)=>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail : checkDuplicateUsernameOrEmail,
    checkRolesExisted : checkRolesExisted
}
module.exports = verifySignUp;