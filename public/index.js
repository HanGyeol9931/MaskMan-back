// 설치해야될 것
// sequelize, mysql2 둘다 설치
// npm i sequelize mysql2
const Sequelize = require("sequelize");
const config = require("../config");
const user = require("./user")
const border = require("./border")
const nft = require("./nft")
const replies = require("./replies")
const shop = require("./shop")

const sequelize  = new Sequelize(config.dev.database,config.dev.username,config.dev.password,config.dev)

const db = {};

db.sequelize = sequelize;
db.user = user;
db.border = border;
db.nft = nft;
db.replies = replies;
db.shop = shop;

user.init(sequelize)
border.init(sequelize)
nft.init(sequelize)
replies.init(sequelize)
shop.init(sequelize)

replies.repliesConnect(db)
user.borderConnect(db)
border.borderConnect(db)
border.repliesConnect(db)
user.nftConnect(db)
nft.nftConnect(db)
shop.shopConnect(db)


module.exports = db