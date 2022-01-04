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

    console.log("[db] Conectada con éxito");
}catch(err){
    console.error("[DB-ERROR] Hubo un error al conectarse a la base de datos");
    console.error(err);
}    
