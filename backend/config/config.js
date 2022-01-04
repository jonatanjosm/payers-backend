require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbName : process.env.DB_NAME,
    dbUser : process.env.DB_USER,
    dbPassword : process.env.DB_PASSWORD,
    collection : process.env.COLLECTION_NAME,
    mongoConnection: process.env.MONGO_CONNECTION,
    secret: process.env.JWTSECRET
}; 

module.exports = config;