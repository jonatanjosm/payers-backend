
const {teamModel, playerModel} = require('./model');

async function listTeams () {
    const teams = await teamModel.find();
    return teams;
};

async function listPlayersByTeam (idTeam) {
    let filter = {
        "idTeam": { $eq:  `${idTeam}` }
    }
    console.log("[LOG-INFO] List players by team filter");
    console.log(filter);
    const players = await playerModel.find( filter );
    return players;
};

async function listPlayersByPosition (position) {
    let filter = {
        "rol": { $eq: position }
    }
    console.log("[LOG-INFO] List players by position filter");
    console.log(filter);
    const players = await playerModel.find( filter );
    return players;
};

module.exports = {
    listTeams,
    listPlayersByTeam,
    listPlayersByPosition
}