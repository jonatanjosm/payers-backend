const { getService } = require('./Services');

function ExceptionUser(message) {
    this.message = message;
    this.name = "ExceptionUser";
}

const validateCreateUser = async (userData, endpoint) => {
    try {
        
        if(!userData.user || userData.user == null || !userData.password || userData.password == null){
            var ownExcepcionUsuario = new ExceptionUser("Datos inválidos");
            throw ownExcepcionUsuario;
        }

        const response = await getService(userData, endpoint, 'POST');

        if(!!response.error && response.error != "" && response.error != null){
            var ownExcepcionUsuario = new ExceptionUser(response.error);
            throw ownExcepcionUsuario;
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
    validateCreateUser
}