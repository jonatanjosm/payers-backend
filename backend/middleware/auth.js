const response = require('../network/response')

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api-key'];
    if (apiKey == '1234'){
        next();
    } else {
        next(response.error(req, res, "Unauthorized", 401, "Invalid Api Key"))
    }
}

module.exports = { checkApiKey }