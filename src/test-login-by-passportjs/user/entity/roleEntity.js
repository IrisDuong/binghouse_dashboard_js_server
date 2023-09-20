module.exports = (sequelize,DataTypes) =>{
  return sequelize.define("roles",{
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
  })
}