var userService = require("../service/user.service");
var {Storage} = require("@google-cloud/storage");
var {format} = require("util");
var processFile = require("../../../config/google-cloud.upload");
const { error } = require("console");
const createUser = async (req,res)=>{
    var statusCode = 201;
    var data = {};
    await processFile(req,res);
    var uploadFile = req.file
    var storage = new Storage({keyFilename : appRoot + "/src/config/bh-google-cloud-key.json"});
    var bucket = storage.bucket("binghouse_storage");
    try {
        if(!req.file) return res.status(400).json({message: "Please upload a file"});

        var blob = bucket.file("bh-avatar/"+uploadFile.originalname);
        var blobStream = blob.createWriteStream({
            resumable : false
        });
        blobStream.on("error",(error)=>{
            res.status(500).json({message: error})
        });
        blobStream.on("finish",async (data)=>{
            res.status(200).json({message: `Upload file ${uploadFile.originalname} to Google Cloud successfully`});
        });
        blobStream.end(uploadFile.buffer)
    } catch (error) {
        res.status(500).json({message: error})
    }
    // var param = {
    //     email : req.body.email,
    //     fullName : req.body.fullName,
    //     dob : req.body.dob,
    //     sexGbn : req.body.sexGbn,
    // }
    // console.log("param signup from client",req.body);
    // console.log("param Avatar signup from client");
    // console.log(req.body.file);
    // var param = {
    //     userName : req.body.userName,
    //     password : req.body.password,
    //     email : req.body.email,
    //     fullName : req.body.fullName,
    //     dob : req.body.dob,
    //     address : req.body.address,
    //     avatarPath : req.body.avatarPath
    // }
    // try {
    //     var _user = await userService.createUser(param);
    //     await _user.setTb_mba_roles(req.body.roles)
    //     statusCode = 201;
    //     data.message = "User Registration successfully !"
    //     data.user = _user;
    // } catch (error) {
    //     statusCode = 500;
    //     data.message = "Failed ! Error in User Registration !"
    // }
    // res.status(statusCode).json(data);
   
}

module.exports = {
    createUser : createUser
}