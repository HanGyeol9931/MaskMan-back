const Sequelize = require("sequelize");

class shop extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            shop_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            shop_price:{
                type: Sequelize.STRING(255),
                allowNull : false,
            },
            shop_img:{
                type: Sequelize.TEXT,
                allowNull : false,
            },
            shop_title:{
                type: Sequelize.STRING(255),
                allowNull : false,
            },
            shop_auction:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false,
            },
            shop_writer:{
                type : Sequelize.STRING(20),
                allowNull : false,
                defaultValue : "null"
            },
            shop_writer_profil:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
            shop_date:{
                type : Sequelize.STRING(255),
                allowNull : false,
                defaultValue :0
            },
        },
        {
            sequelize,
            timestamps:true,
            modelName : "shop",
            tableName : "shops",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static shopConnect(db){
        db.shop.hasMany(db.user, { foreignKey : "shop_id", targetKey : "shop_id" });
    }
}

module.exports = shop;