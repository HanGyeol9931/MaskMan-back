const Sequelize = require("sequelize");

class nft extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nft_tilte:{
                type: Sequelize.STRING(255),
                allowNull : false,
            },
            nft_background:{
                type : Sequelize.STRING(20),
                allowNull : false,

            },
            nft_header:{
                type : Sequelize.STRING(20),
                allowNull : false,

            },
            nft_face:{
                type : Sequelize.STRING(20),
                allowNull : false,
                
            },
            nft_eyes:{
                type : Sequelize.STRING(20),
                allowNull : false,
                
            },
            nft_mouse:{
                type : Sequelize.STRING(20),
                allowNull : false,
                
            },
            nft_owner:{
                type : Sequelize.STRING(20),
                allowNull : false,
                defaultValue : "null"       
            },
            nft_staking:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false      
            },
            nft_stakingPoint:{
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 0      
            },
            nft_sell:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
                defaultValue : false      
            },
        },
        {
            sequelize,
            timestamps:true,
            modelName : "nft",
            tableName : "nfts",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
    static nftConnect(db){
        db.nft.hasMany(db.user, { foreignKey : "id", targetKey : "user_nickname" });
    }
}

module.exports = nft;