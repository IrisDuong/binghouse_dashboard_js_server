var Multer = require("multer");
var util = require("util");

var storage = Multer({storage:Multer.memoryStorage()}).single("file");
module.exports = util.promisify(storage)