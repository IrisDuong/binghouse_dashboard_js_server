
exports.validateLogin = (req,res,next)=>{
    if((typeof req.body.userName != "undefined") && (typeof req.body.password != "undefined")){
        next();
    }else{
        if((typeof req.body.userName === "undefined")) return res.status(400).json({data:{message :"The username is required"}});
        if((typeof req.body.password === "undefined")) return res.status(400).json({data:{message :"The password is required"}});
        return res.status(400).json({data:{message :"Both username & password are required"}});
    }
}

