module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_syb_common_code",{
        system_code : {
            type: DataTypes.CHAR(4),
            primaryKey: true
        },
        common_code : {
            type: DataTypes.CHAR(8),
            primaryKey: true
        },
        n_locale_code : DataTypes.INTEGER,
        use_yn : DataTypes.CHAR(1),
    }
    ,{underscored:true})
}