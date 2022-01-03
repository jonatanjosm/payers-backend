const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rolSchema = new Schema({
    "@idRol": String,
    "#text": String
});
                            
const playerSchema = new Schema({
    "@id": String,
    nombre: String,
    nombreCorto: String,
    rol: rolSchema
});

const playersSchema = new Schema({
    jugador: [playerSchema]
});

const mySchema = new Schema({
    "@id": String,
    nombre: String,
    sigla: String,
    paisId: String,
    paisNombre: String,
    tipo: String,
    jugadores: [{
        jugador: [{
            "@id": String,
            nombre: String,
            nombreCorto: String,
            rol: {
                "@idRol": String,
                "#text": String
            }
        }]
    }]
});


const model = mongoose.model('teams', mySchema);

module.exports = model;