var {SycLocaleCodeEntity,SybCommonCodeEntity, sequelize} = require("../../../config/database");
const getMaxLocaleCode = async () =>{
    var maxLocaleCode = await SycLocaleCodeEntity.max("locale_code")
    console.log("maxLocaleCode from DB",maxLocaleCode);
    if(maxLocaleCode){
        return maxLocaleCode+1;
    }else{
        return 1;
    }
}
const createLocaleCode = async param =>{
     await SycLocaleCodeEntity.create(
            {
                locale_code : param.locale_code,
                lang_code : param.lang_code,
                code_name :  param.code_name
            }
    );
}
const createCommonCode = async param =>{
    await SybCommonCodeEntity.create({
        system_code : param.system_code,
        common_code : param.common_code,
        n_locale_code : param.n_locale_code,
        code_type:  param.code_type,
        use_yn :  param.use_yn,
    });
}
const getCommonCodeInfo = async param =>{
    console.log("getCommonCodeInfo param dao ",param);
    return await SybCommonCodeEntity.findAll({
        where : {
            system_code : param.system_code,
            common_code : param.common_code
        },
        include : [
            {
                model : SycLocaleCodeEntity,
                attributes : ['code_name'],
                // through : {
                //     attributes : []
                // }
            }
        ],
        attributes : ['system_code','common_code','tb_syc_locale_code.code_name'],
        
    })
}
module.exports = {
    getMaxLocaleCode : getMaxLocaleCode,
    createLocaleCode : createLocaleCode,
    createCommonCode  : createCommonCode,
    getCommonCodeInfo : getCommonCodeInfo
}