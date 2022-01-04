const config = require("./config");
const db = require('mongoose');

const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = config.mongoConnection.replace("<password>", PASSWORD ).replace("myFirstDatabase", DB_NAME);

console.log(MONGO_URI);

try{

    db.Promise = global.Promise;
    db.connect(MONGO_URI,{
        useNewUrlParser: true
    });

    console.log("[LOG-INFO] Database connection established");
}catch(err){
    console.error("[LOG-ERROR] An error has occurred while connecting database");
    console.error(err);
}    
