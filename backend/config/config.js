require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbName : process.env.DB_NAME,
    dbPassword : process.env.DB_PASSWORD,
    mongoConnection: process.env.MONGO_CONNECTION,
    secret: process.env.JWTSECRET
}; 

module.exports = config;