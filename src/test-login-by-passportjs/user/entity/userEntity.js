module.exports = (sequelize,DataTypes)=>{
    return sequelize.define("users",{
        id:{
            autoIncrement:true,
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull:false
        },
        user_name: DataTypes.STRING,
        password :  DataTypes.STRING,
        first_name : DataTypes.STRING,
        last_name : DataTypes.STRING,
        email : DataTypes.STRING,
        dob : DataTypes.STRING,
        address: DataTypes.STRING
    })
}