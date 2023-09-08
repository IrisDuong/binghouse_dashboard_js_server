var {userEntity,roleEntity,Sequelize} = require("../../../config/database");
var {Op} = Sequelize;
var config = require("../../../config/auth.config");

var jwt = require("jsonwebtoken");
// var crypto = require("")

exports.signup  = (req,res)=>{
    var param = {
        user_name : req.body.userName,
        email: req.body.email,
        password : req.body.password,
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        dob : req.body.dob,
        address : req.body.address
    }

    userEntity.create(param)
    .then(user=>{
        if(req.body.roles){
            roleEntity.findAll({
                where:{
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then(roles=>{
                user.setRoles(roles)
                .then(()=>{
                    res.send({ message: "User was registered successfully!" })
                })
            })
        }else{
            user.setRoles([1]).then(()=> res.send({ message: "User was registered successfully!" }));
        }
    })
    .catch(error=>res.status(500).send({ message: err.message }))
}

exports.signin = (req,res,next)=>{
    userEntity.findOne({
        where:{
            user_name : req.body.userName,
            password:  req.body.password
        }
    })
    .then(user=>{
        if(!user){
            return res.status(404).send({accessToken: null, message: "User Not found." });
        }

        var token = jwt.sign(
            {id: user.id},
            config.secret_key,
            {
                algorithm : "HS256",
                allowInsecureKeySizes : true,
                expiresIn : 300
            }
            )
        var authorities = [];
        user.getRoles()
        .then(roles=>{
            for(let i = 0; i < roles.length;i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id : user.id,
                userName : user.user_name,
                email : user.email,
                firstName : user.first_name,
                lastName : user.last_name,
                address : user.address,
                roles : authorities,
                accessToken : token
            });
        });
    })
    .catch(error=>{
        res.status(500).send({ message: err.message });
    })
}