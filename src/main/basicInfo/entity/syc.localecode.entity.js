module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_syc_locale_code",{
        locale_code : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        lang_code : {
            type: DataTypes.CHAR(4),
            primaryKey: true
        },
        code_name : {
            type: DataTypes.STRING
        }
    },{underscored:true})
}