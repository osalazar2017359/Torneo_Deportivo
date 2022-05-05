const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Asignacion_equiposSchema = Schema({
    idLiga: String,
    nombreLiga: String,
    idEquipo: String,
    nombreEquipo: String
});
module.exports = mongoose.model('asignacion_equipos', Asignacion_equiposSchema);

