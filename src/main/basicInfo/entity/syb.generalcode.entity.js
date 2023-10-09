module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_syb_general_code",{
        system_code : {
            type: DataTypes.CHAR(4),
            primaryKey: true
        },
        common_code : {
            type: DataTypes.CHAR(8),
            primaryKey: true
        },
        general_code : {
            type: DataTypes.CHAR(20),
            primaryKey: true
        },
        order_seq :  DataTypes.INTEGER,
        n_locale_code : DataTypes.INTEGER,
        use_yn : DataTypes.CHAR(1),
    },{underscored:true})
}