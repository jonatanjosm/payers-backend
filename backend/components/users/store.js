const { hashPassword } = require('../../utils/pass-hash');
const { userModel } = require('./model')


async function createUser(userData) {
    try {
        userData.password = await hashPassword(userData.password);
        const user = new userModel(userData);
        user.save();
        return true;
    } catch (error) {
        console.error('[LOG-ERROR] An error has occurred while creating user')
        console.log(error)
        return false;
    }
}

async function findUser (username) {
    let filter = {
        "user": { $eq:  `${username}` }
    }
    console.log("[LOG-INFO] Search user filter");
    console.log(filter);
    const user = await userModel.find( filter );
    return user;
};


module.exports = {
    createUser,
    findUser
}