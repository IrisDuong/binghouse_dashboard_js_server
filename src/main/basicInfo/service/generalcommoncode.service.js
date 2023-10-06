var generalCommonCodeDao = require("../dao/generalcommoncode.dao");

const createCommonCode = async param =>{
    try {
    var maxLocaleCode = await generalCommonCodeDao.getMaxLocaleCode();
    if(maxLocaleCode){
         param.codeNames.map(async e=>{
            var codeName =  { 
                locale_code : maxLocaleCode,
                lang_code : e.langCode,
                code_name :  e.codeName
            }
            await generalCommonCodeDao.createLocaleCode(codeName)
        });
    }

    var commonCode = { 
        system_code : param.systemCode,
        detail_code : param.detailCode,
        n_locale_code : maxLocaleCode,
        code_type : param.codeType,
        use_yn : param.useYn,
        work_code : param.workCode
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

const getListCommonCodes = async param =>{
    var _listCommonCodes =  await generalCommonCodeDao.getListCommonCodes({
        system_code : param.systemCode,
        work_code : param.workCode
    });
    if(_listCommonCodes){
        var listCommonCodes = _listCommonCodes.map((e,index)=>{
            let codeNames = [];
            if(e.getTb_syc_locale_code()){
                e.getTb_syc_locale_code().map((k,index)=>{
                    codeNames.push(
                        {
                        langCode : k.lang_code,
                        codeName:k.code_name
                        }
                    )
                })
            }
           var commonCode =  {
            systemCode : e.system_code,
            detailCode : e.detail_code,
            codeType : e.code_type,
            useYn : e.use_yn,
            codeNames : codeNames,
            workCode : e.work_code
           }
           console.log("commonCode",commonCode);
           return commonCode;
        });
        return listCommonCodes
    }else{
        return [];
    }
}
module.exports = {
    createCommonCode : createCommonCode,
    getCommonCodeInfo  :getCommonCodeInfo,
    getListCommonCodes  : getListCommonCodes
}