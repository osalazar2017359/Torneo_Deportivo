const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LigaSchema = Schema({
    nombreLiga: String,
    idUsuario: String
});
module.exports = mongoose.model('ligas', LigaSchema);

