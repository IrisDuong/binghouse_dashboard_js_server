module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_syb_common_code",{
        system_code : {
            type: DataTypes.CHAR(4),
            primaryKey: true
        },
        detail_code : {
            type: DataTypes.CHAR(8),
            primaryKey: true
        },
        n_locale_code : DataTypes.INTEGER,
        code_type:  DataTypes.CHAR(2),
        use_yn : DataTypes.CHAR(1),
        work_code : DataTypes.CHAR(3)
    }
    ,{underscored:true})
}