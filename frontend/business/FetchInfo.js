const { getService } = require('./Services');

function ExceptionTeams(message) {
    this.message = message;
    this.name = "ExceptionTeams";
}

function ExceptionPlayers(message) {
    this.message = message;
    this.name = "ExceptionPlayers";
}

const fetchTeams = async () => {
    try {
        
        const response = await getService(null, "teams/", 'GET');

        if(!!response.error && response.error != "" && response.error != null){
            var ownExcepcionTeams = new ExceptionTeams(response.error);
            throw ownExcepcionTeams;
        } else {
            return {
                error: false,
                message: "",
                body: response.body
            }
        }
        
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

const fetchPlayers = async (filterData) => {
    try {
        var endpoint = filterData.filter == 'idTeam' ? `teams/${filterData.value}/players` : `teams/players/${filterData.value}`;
        
        const response = await getService(null, endpoint, 'GET');

        if(!!response.error && response.error != "" && response.error != null){
            var ownExcepcionTeams = new ExceptionPlayers(response.error);
            throw ownExcepcionTeams;
        } else {
            return {
                error: false,
                message: "",
                body: response.body
            }
        }
        
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

export {
    fetchTeams,
    fetchPlayers
}