var {Sequelize,DataTypes} = require("sequelize");
require("dotenv").config();

var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect : process.env.DB_DIALECT,
        host : process.env.DB_HOST,
        timezone : "+07:00",
        dialectOptions : {
            useUTC :false,
            dateStrings : true,
            typeCast : true,
            timezone : "+07:00"
        }
        
    }
)

sequelize.authenticate()
.then(()=>console.log("=============================CONNECT TO MYSQL DATABASE successfully ============================="))
.catch(error=>console.log("=============================CONNECT TO MYSQL DATABASE failed ============================="));

var database = {}
database.sequelize = sequelize;
database.Sequelize = Sequelize;
database.ROLES = ["ADMIN","MODERATOR","EMPLOYEE","CUSTOMER","ETC"];

/**
 * Initial model
 */

//member and auth
database.RoleEntity = require("../main/user/entity/role.entity")(sequelize,DataTypes);
database.UserEntity = require("../main/user/entity/user.entity")(sequelize,DataTypes);
database.RefreshTokenEntity = require("../main/auth/entity/refresh.token.entity")(sequelize,DataTypes);

//common code
database.SyaAttachFileEntity = require("../main/common/entity/sya.file.entity")(sequelize,DataTypes);
// database.SybCommonCodeEntity = require("../main/common/entity/syb.commoncode.entity")(sequelize,DataTypes);
// database.SybGeneralCodeEntity = require("../main/common/entity/syb.generalcode.entity")(sequelize,DataTypes);

//Association
database.RoleEntity.belongsToMany(database.UserEntity,{through : "tb_mba_user_role"});
database.UserEntity.belongsToMany(database.RoleEntity,{through : "tb_mba_user_role"});
database.RefreshTokenEntity.belongsTo(database.UserEntity,{foreignKey : "user_id",targetKey : "id"})
database.UserEntity.hasOne(database.RefreshTokenEntity,{foreignKey:"user_id",targetKey : "id"});
database.UserEntity.belongsTo(database.SyaAttachFileEntity,{foreignKey:"attach_file_code"});
//Connection
database.sequelize.sync({alter:true})
.then(async ()=>{
    console.log("=============================All tables successfully =============================")
    //Init list ROLES
    var _listRoles = await database.RoleEntity.findAll();
    for(let i = 0; i < database.ROLES.length; i++){
        var _existedRoles = [];
        if(_listRoles) _existedRoles = _listRoles.filter(e=> e.name === database.ROLES[i]);
        if(_existedRoles.length === 0) database.RoleEntity.create({name :  database.ROLES[i]});
    }
})
.catch(error=>console.log("=============================Failed to create tables  ============================="));

module.exports = database;