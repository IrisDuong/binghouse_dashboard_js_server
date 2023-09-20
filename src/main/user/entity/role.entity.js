module.exports =  (sequelize, DataTypes) =>{
    return sequelize.define("tb_mba_role",{
        id : {
            autoIncrement : true,
            primaryKey : true,
            type :  DataTypes.INTEGER
        },
        name : DataTypes.STRING
    },
    {
        underscored : true
    }
    )
}