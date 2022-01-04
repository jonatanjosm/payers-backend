const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(userInfo) {
    
    const jwtConfig = {
      expiresIn: '1d',
    };
    const payload = {
      sub: userInfo,
      role: "user"
    }
    
    const token = jwt.sign(payload, config.secret, jwtConfig);

    return token;
}

module.exports = {
    generateToken
};