const db = require('mongoose');
const config = require('../../config');
const {teamModel, playerModel} = require('./model');

console.log(config);
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

async function listTeams () {
    const teams = await teamModel.find();
    return teams;
};

async function listPlayersByTeam (idTeam) {
    let filter = {
        "idTeam": { $eq:  `${idTeam}` }
    }
    console.log(filter);
    const players = await playerModel.find( filter );
    return players;
};

async function listPlayersByPosition (position) {
    let filter = {
        "rol": { $eq: position }
    }
    console.log(filter);
    const players = await playerModel.find( filter );
    return players;
};

module.exports = {
    listTeams,
    listPlayersByTeam,
    listPlayersByPosition
}