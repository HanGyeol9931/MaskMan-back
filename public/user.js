const Sequelize = require("sequelize");

class user extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id:{
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            user_pw:{
                type : Sequelize.STRING(20),
                allowNull : false,

            },
            user_nickname:{
                type : Sequelize.STRING(20),
                allowNull : false,
                // unique : true,
            },
            user_point:{
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 10000
            },
            user_profil:{
                type : Sequelize.TEXT,
                allowNull : false,
                defaultValue : "/static/media/Dimg.3a3709250f79e97ed0f0.png"
            },
            user_admin:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false
            },
            user_whitelist:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false
            },
            user_stop:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false
            },
        },
        {
            sequelize,
            timestamps:true,
            modelName : "User",
            tableName : "users",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static borderConnect(db){
        db.user.hasMany(db.border, { foreignKey : "id", sourceKey : "id" });
    }
    static nftConnect(db){
        db.user.hasMany(db.nft, { foreignKey : "id", sourceKey : "id" });
    }
    static shopConnect(db){
        db.user.hasMany(db.shop, { foreignKey : "id", targetKey : "id" });
    }
}

module.exports = user;