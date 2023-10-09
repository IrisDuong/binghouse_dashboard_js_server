var router = require("express").Router();
var {validateCommonCode} = require("../main/basicInfo/middleware/generalcommoncode.middleware");
var generalcommoncode = require("../main/basicInfo/controller/generalcommoncode.controller");
console.log("basic info routes");
router.post("/createCommonCode", generalcommoncode.createCommonCode);
router.post("/getCommonCodeInfo",generalcommoncode.getCommonCodeInfo);
router.post("/getListCommonCodes",generalcommoncode.getListCommonCodes);
router.post("/getListGeneralCodes",generalcommoncode.getListGeneralCodes)
module.exports = router;