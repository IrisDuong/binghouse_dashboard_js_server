const validateCommonCode = (req,res,next)=>{
    if(req.body.listCommonCodes){
        next();
    }else{
        return res.status(400).json({message : "Common code is required"})
    }
}

module.exports = {
    validateCommonCode : validateCommonCode
}