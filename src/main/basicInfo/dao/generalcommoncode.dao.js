var {SycLocaleCodeEntity,SybCommonCodeEntity, Sequelize, SybGeneralCodeEntity} = require("../../../config/database");
const {Op} = Sequelize;

const getMaxLocaleCode = async () =>{
    var maxLocaleCode = await SycLocaleCodeEntity.max("locale_code")
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
        work_code : param.work_code
    });
}
const getCommonCodeInfo = async param =>{
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

const getListCommonCodes = async param =>{
    return await SybCommonCodeEntity.findAll({
        where : {
            system_code : param.system_code,
            work_code : param.work_code
        }
    })
}
const getListGeneralCodes = async param =>{
    return await SybGeneralCodeEntity.findAll({
        where : {
            system_code : param.system_code,
            common_code  : param.common_code
        },
        include : {
            model : SycLocaleCodeEntity,
            where : {
                lang_code : "EN"
            }
        },
        order : [
            ["order_seq","ASC"]
        ]
    })
}
module.exports = {
    getMaxLocaleCode : getMaxLocaleCode,
    createLocaleCode : createLocaleCode,
    createCommonCode  : createCommonCode,
    getCommonCodeInfo : getCommonCodeInfo,
    getListCommonCodes : getListCommonCodes,
    getListGeneralCodes  : getListGeneralCodes
}