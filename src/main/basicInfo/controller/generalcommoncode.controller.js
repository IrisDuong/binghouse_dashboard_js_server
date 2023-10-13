var generalCommonCodeService = require("../service/generalcommoncode.service");
var url = require("url");

const createCommonCode  = async (req,res)=>{
    try {
        await generalCommonCodeService.createCommonCode(req.body)
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
const getListCommonCodes = async (req,res)=>{
    try {
        var listCommonCodes = await generalCommonCodeService.getListCommonCodes({
            systemCode : req.body.systemCode,
            workCode :  req.body.workCode
        });
        return res.status(200).json({message : "Get Common Code successfully",data:listCommonCodes})
    } catch (error) {
        return res.status(500).json({message : error});
    }
}

const getListGeneralCodes = async (req,res)=>{
    try {
        var listGeneralCodes = await generalCommonCodeService.getListGeneralCodes({
            systemCode : req.body.systemCode,
            commonCode :  req.body.commonCode
        })
        return res.status(200).json({message : "Get Generals Code successfully",data:listGeneralCodes})
    } catch (error) {
        return res.status(500).json({message : error});
    }
}
const getCommonCodeDetail  = async (req,res)=>{
    var parsedParams = url.parse(req.url,true)
    console.log("************************************* getCommonCodeDetail by params ************************************ ");
    console.log(parsedParams.query.systemCode);
    try {
        var commonCode = await generalCommonCodeService.getCommonCodeInfo({
            systemCode : parsedParams.query.systemCode,
            commonCode : parsedParams.query.commonCode
        });
        res.status(200).json({message : "Get Common Code successfully",data:commonCode})
    } catch (error) {
        return res.status(500).json({message : error});
    }
}
module.exports = {
    createCommonCode : createCommonCode,
    getCommonCodeInfo : getCommonCodeInfo,
    getListCommonCodes  : getListCommonCodes,
    getListGeneralCodes : getListGeneralCodes,
    getCommonCodeDetail : getCommonCodeDetail
}