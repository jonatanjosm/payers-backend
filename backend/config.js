require('dotenv').config();

console.log(process.env.CORS)
const config = {
    port: process.env.PORT || 3000,
    cors : process.env.CORS,
    dbName : process.env.DB_NAME,
    dbUser : process.env.DB_USER,
    dbPassword : process.env.DB_PASSWORD,
    collection : process.env.COLLECTION_NAME,
    mongoConnection: process.env.MONGO_CONNECTION
}; 

module.exports = config;