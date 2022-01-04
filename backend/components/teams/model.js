const mongoose = require('mongoose');

const Schema = mongoose.Schema;


                            
const playerSchema = new Schema({
    id: String,
    idTeam: String,
    nombre: String,
    apellido: String,
    nombreCorto: String,
    fechaNacimiento: Date,
    rol: String,
    edad: Number,
    peso: Number,
    altura: Number,
    camiseta: Number
});


const teamSchema = new Schema({
    id: String,
    nombre: String,
    sigla: String,
    paisId: String,
    paisNombre: String,
    tipo: String
});


const teamModel = mongoose.model('teams', teamSchema);
const playerModel = mongoose.model('players', playerSchema);

module.exports = {
    teamModel,
    playerModel
};