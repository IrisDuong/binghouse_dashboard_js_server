var {Sequelize,DataTypes} = require("sequelize");
require("dotenv").config();

var connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect : process.env.DB_DIALECT,
        pool:{
            max : 5,
            min : 0,
            idle : 10000,
            acquire : 30000
        },
    }
)

var db = {};
db.Sequelize = Sequelize
db.connection = connection;

db.userEntity = require("../main/user/entity/userEntity")(connection,DataTypes);
db.roleEntity = require("../main/user/entity/roleEntity")(connection,DataTypes);

db.roleEntity.belongsToMany(db.userEntity,{
    through : "user_roles"
});

db.userEntity.belongsToMany(db.roleEntity,{
    through : "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

db.connection.authenticate()
.then(()=>{
    console.log("Connected to database successfully");
})
.catch(error=>{
    console.log("Connected to database failed");
})
module.exports = db;