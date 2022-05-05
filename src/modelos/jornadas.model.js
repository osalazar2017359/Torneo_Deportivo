const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JornadaSchema = Schema({
    No_Jornada: String,
    partidos: [{
        equipo1: String,
        puntuacion1: Number,
        equipo2: String,
        puntuacion2: Number
    }],
    Liga: String
});
module.exports = mongoose.model('jornadas', JornadaSchema);

