const Sequelize = require("sequelize");

class border extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            border_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            border_title:{
                type: Sequelize.STRING(255),
                allowNull : false,
            },
            border_content:{
                type : Sequelize.TEXT,
                allowNull : false,

            },
            border_writer:{
                type : Sequelize.STRING(20),
                allowNull : false,
                defaultValue : "null"
            },
            border_writer_profil:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
            border_view_count:{
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue :0
            },
            border_like:{
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue :0
            },
        },
        {
            sequelize,
            timestamps:true,
            modelName : "border",
            tableName : "borders",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static borderConnect(db){
        db.border.hasMany(db.user, { foreignKey : "border_id", targetKey : "border_id" });
    }
    static repliesConnect(db){
        db.border.hasMany(db.replies, { foreignKey : "replies_id", sourceKey : "border_id" });
    }
}

module.exports = border;