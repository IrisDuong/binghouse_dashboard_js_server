var generalCommonCodeService = require("../service/generalcommoncode.service");
const createCommonCode  = async (req,res)=>{
    try {
        await generalCommonCodeService.createCommonCode(req.body.listCommonCodes)
        return res.status(201).json({message : "Create common code successfully"});
    } catch (error) {
        return res.status(500).json({message : "Create common code failed"});
    }
}
const getCommonCodeInfo  = async (req,res)=>{
    try {
        var commonCode = await generalCommonCodeService.getCommonCodeInfo({
            systemCode : req.body.systemCode,
            commonCode : req.body.commonCode
        });
        res.status(200).json({message : "Get Common Code successfully",data:commonCode})
    } catch (error) {
        return res.status(500).json({message : error});
    }
}
module.exports = {
    createCommonCode : createCommonCode,
    getCommonCodeInfo : getCommonCodeInfo
}