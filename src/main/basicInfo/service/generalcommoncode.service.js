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
        common_code : param.commonCode,
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
           var _commonCode =  {
            systemCode : e.system_code,
            commonCode : e.common_code,
            codeType : e.code_type,
            useYn : e.use_yn,
            codeNames : codeNames,
            workCode : e.work_code
           }
           return _commonCode;
        });
        return listCommonCodes
    }else{
        return [];
    }
}

const getListGeneralCodes = async param =>{
    var _listGeneralCodes =  await generalCommonCodeDao.getListGeneralCodes({
        system_code : param.systemCode,
        common_code : param.commonCode
    });

    var result = []
    for(let i = 0; i < _listGeneralCodes.length;i++){
        var locale = await _listGeneralCodes[i].getTb_syc_locale_code();
        var codeName = locale.code_name;
        result.push({
            systemCode : _listGeneralCodes[i].system_code,
            commonCode : _listGeneralCodes[i].common_code,
            generalCode : _listGeneralCodes[i].general_code,
            useYn : _listGeneralCodes[i].use_yn,
            codeName : codeName,
            orderSeq : _listGeneralCodes[i].order_seq
        })
    }
    return result;
}
module.exports = {
    createCommonCode : createCommonCode,
    getCommonCodeInfo  :getCommonCodeInfo,
    getListCommonCodes  : getListCommonCodes,
    getListGeneralCodes : getListGeneralCodes
}