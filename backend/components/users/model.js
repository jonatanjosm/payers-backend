const mongoose = require('mongoose');

const Schema = mongoose.Schema;
          
const userSchema = new Schema({
    user: String,
    password: String
});


const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel
}