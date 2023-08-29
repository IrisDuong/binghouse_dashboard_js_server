const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../../../config/databaseconn");

const User  = sequelize.define("user",{
    id:{
        autoIncrement:true,
        type: DataTypes.INTEGER,
        primaryKey : true,
        allowNull:false
    },
    first_name : DataTypes.STRING,
    last_name : DataTypes.STRING,
    email : DataTypes.STRING,
    dob : DataTypes.STRING,
    address: DataTypes.STRING
})

module.exports = User;