const mongoose = require('mongoose');

const Schema = mongoose.Schema;


                            
const playerSchema = new Schema({
    id: String,
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


const model = mongoose.model('teams', mySchema);

module.exports = model;