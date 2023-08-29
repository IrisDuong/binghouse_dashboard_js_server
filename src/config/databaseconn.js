const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "binghouse_js",
    "root",
    "12345",
    {
        host:"localhost",
        dialect:"mysql",
        pool:{
            max:5,
            min:0,
            idl:10000
        }
    }
);
sequelize.authenticate().then(()=>{
   console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
module.exports = sequelize;