
const {teamModel, playerModel} = require('./model');

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