const getTeams = () => {
    return 'Equipos';
};

const getPlayersByTeam = (teamId) => {
    return 'Jugadores del equipo ' + teamId;
};

const getPlayersByPosition = (position) => {
    return 'Jugadores en la posicion ' + position;
};

module.exports = {
    getTeams,
    getPlayersByTeam,
    getPlayersByPosition
}