var router = require("express").Router();
var {validateCommonCode} = require("../main/basicInfo/middleware/generalcommoncode.middleware");
var {createCommonCode,getCommonCodeInfo,getListCommonCodes} = require("../main/basicInfo/controller/generalcommoncode.controller");
console.log("basic info routes");
router.post("/createCommonCode", createCommonCode);
router.post("/getCommonCodeInfo",getCommonCodeInfo);
router.post("/getListCommonCodes",getListCommonCodes)
module.exports = router;