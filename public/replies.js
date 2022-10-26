const Sequelize = require("sequelize");

class replies extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            replies_id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            border_id:{
                type : Sequelize.INTEGER,
                allowNull : false,
            },
            replies_writer:{
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            replies_profil:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
            replies_content:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
        },
        {
            sequelize,
            timestamps:true,
            modelName : "replies",
            tableName : "repliess",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static repliesConnect(db){
        db.replies.hasMany(db.border, { foreignKey : "replies_id", targetKey : "border_id" });
    }
}

module.exports = replies;