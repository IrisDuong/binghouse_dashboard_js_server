var generalCommonCodeDao = require("../dao/generalcommoncode.dao");

const createCommonCode = async listCommonCodes =>{
    try {
    var maxLocaleCode = await generalCommonCodeDao.getMaxLocaleCode();
    if(maxLocaleCode){
        // for(var i = 0; i < listCommonCodes.length;i++){
        //     console.log(`maxLocaleCode = ${maxLocaleCode} ; langCode = ${listCommonCodes[i].langCode} ; codeName = ${listCommonCodes[i].codeName}`)
        //     var codeName =  { 
        //         locale_code : maxLocaleCode,
        //         lang_code : listCommonCodes[i].langCode,
        //         code_name : listCommonCodes[i].codeName
        //     }
        //     await generalCommonCodeDao.createLocaleCode(codeName)
        // }
        listCommonCodes.map(async e=>{
            var codeName =  { 
                locale_code : maxLocaleCode,
                lang_code : e.langCode,
                code_name :  e.codeName
            }
            await generalCommonCodeDao.createLocaleCode(codeName)
        });
    }

    var commonCode = { 
        system_code : listCommonCodes[0].systemCode,
        common_code : listCommonCodes[0].commonCode,
        n_locale_code : maxLocaleCode,
        code_type : listCommonCodes[0].codeType,
        use_yn : listCommonCodes[0].useYn
    }

    return await generalCommonCodeDao.createCommonCode(commonCode);
    } catch (error) {
        return new Error(error);
    }
}
const getCommonCodeInfo = async param =>{
    console.log("getCommonCodeInfo param ",param);
    return await generalCommonCodeDao.getCommonCodeInfo({
        system_code : param.systemCode,
        common_code : param.commonCode
    })
}
module.exports = {
    createCommonCode : createCommonCode,
    getCommonCodeInfo  :getCommonCodeInfo
}