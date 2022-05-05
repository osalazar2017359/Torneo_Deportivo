const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
    nombreEquipo: String,
    pais: String,
    liga: String,
    GF: Number,
    GC: Number,
    DG: Number,
    PJ: Number,
    idUsuario: String
});
module.exports = mongoose.model('equipos', EquipoSchema);

