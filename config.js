const config = {
    dev :{
        username : "root",
        password : "99319931",
        database : "react",
        host : "127.0.0.1",
        dialect : "mysql",
        timezone:"+09:00",
        dialectOptions: {
        dateStrings: true,
        typeCast: true,
        },
        define: {
        timestamps: true,
        },
    }
}

module.exports = config;