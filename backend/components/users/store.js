const { hashPassword } = require('../../utils/pass-hash');
const { userModel } = require('./model')


async function createUser(userData) {
    try {
        userData.password = await hashPassword(userData.password);
        const user = new userModel(userData);
        user.save();
        return true;
    } catch (error) {
        console.error('[ERROR] error al crear usuario')
        console.log(error)
        return false;
    }
}

async function findUser (username) {
    let filter = {
        "user": { $eq:  `${username}` }
    }
    console.log(filter);
    const user = await userModel.find( filter );
    return user;
};


module.exports = {
    createUser,
    findUser
}