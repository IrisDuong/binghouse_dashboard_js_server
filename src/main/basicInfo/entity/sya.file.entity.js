module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("tb_sya_attach_file",{
        attach_file_code : {
            primaryKey : true,
            type : DataTypes.INTEGER,
        },
        file_seq : {
            primaryKey : true,
            type : DataTypes.INTEGER
        },
        file_path : DataTypes.STRING,
        actual_file_name : DataTypes.STRING,
        thumb_file_name : DataTypes.STRING,
        file_size : DataTypes.BIGINT,
        img_width : DataTypes.INTEGER,
        img_height : DataTypes.INTEGER,
    }
    ,{underscored : true}
    )
}