module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("tb_mba_user",{
        id : {
            autoIncrement : true,
            primaryKey : true,
            type :  DataTypes.INTEGER
        },
        user_name : DataTypes.STRING,
        password : DataTypes.STRING,
        email : DataTypes.STRING,
        full_name : DataTypes.STRING,
        dob : DataTypes.STRING,
        address : DataTypes.STRING,
        avatar_path : DataTypes.STRING
    },
    {
        underscored : true
     }
    )
}