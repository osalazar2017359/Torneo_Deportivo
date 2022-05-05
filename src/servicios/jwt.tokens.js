const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secret = "clave_deportiva_confidencial";

exports.crearToken = function (torneo) {
    let payload = {
        sub: torneo._id,
        usuario: torneo.usuario,
        rol: torneo.rol,
        iat: moment().unix(),
        exp: moment().day(7,'days').unix()
    }
    return jwt_simple.encode(payload, secret);
}