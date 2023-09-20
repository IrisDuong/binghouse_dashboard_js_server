module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_autha_refresh_token",{
        id : {
            autoIncrement : true,
            primaryKey : true,
            type :  DataTypes.INTEGER
        },
        token : DataTypes.STRING,
        exp_date : DataTypes.DATE,
        user_id :  DataTypes.STRING
    },
    {
        underscored : true
    })
}