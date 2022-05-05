const Usuario = require('../modelos/usuarios.model');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../servicios/jwt.tokens');

////////////////////////////////////////////////////////////////
// UNIVERSAL
////////////////////////////////////////////////////////////////
function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ usuario: parametros.usuario }, (error, usuarioEncontrado) => {
        if (error) return res.status(500).send({ mensaje: "Error en la petición" });
        if (usuarioEncontrado) {

            bcrypt.compare(parametros.password, usuarioEncontrado.password, (error, verificacionPassword) => {// V/F

                if (verificacionPassword) {

                    if (parametros.Token === "true") {
                        return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) })
                    }
                } else {
                    usuarioEncontrado.password = undefined;
                    return res.status(200).send({ usuario: usuarioEncontrado })
                }
            })

        } else {
            return res.status(500).send({ mensaje: "Error, este usuario no se encuentra registrado" })
        }
    })
}

function Admin(res) {
    var adminModelo = new Usuario();
    adminModelo.usuario = "ADMIN";
    adminModelo.rol = "Admin";

    Usuario.find({ tipo: adminModelo.tipo }, (error, adminEncontrado) => {
        if (adminEncontrado.length == 0)

            bcrypt.hash('deportes123', null, null, (error, passwordEncriptada) => {
                adminModelo.password = passwordEncriptada;

                adminModelo.save((error, adminGuardado) => {
                    if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                    if (!adminGuardado) return res.status(500).send({ mensaje: "Error, no se creo ningun Admin" });

                });
            });
    });
}


////////////////////////////////////////////////////////////////
// CRUD Usuarios
////////////////////////////////////////////////////////////////
function Registrar(req, res) { //GENERAL
    var parametros = req.body;
    var usuarioModelo = new Usuario();

    if (parametros.nombre && parametros.usuario && parametros.password) {

        usuarioModelo.nombre = parametros.nombre;
        usuarioModelo.apellido = parametros.apellido;
        usuarioModelo.usuario = parametros.usuario;
        usuarioModelo.rol = "Organizador";

        Usuario.find({ usuario: parametros.usuario }, (error, usuarioEncontrado) => {
            if (usuarioEncontrado.length == 0) {

                bcrypt.hash(parametros.password, null, null, (error, passwordEncriptada) => {
                    usuarioModelo.password = passwordEncriptada;

                    usuarioModelo.save((error, usuarioGuardado) => {
                        if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: "Error, no se registro ninguna Empresa" });

                        return res.status(200).send({ Usuario: usuarioGuardado, nota: "Empresa registrada exitosamente" });
                    });
                });

            } else {
                return res.status(500).send({ mensaje: "Este Usuario ya se encuentra utilizado" });
            }
        });
    }
}

function verUsuarios(req, res) {
    Usuario.find((error, usuariosObtenidos) => {

        if (error) return res.send({ mensaje: "error:" + error })
        for (let i = 0; i < usuariosObtenidos.length; i++) {
        }

        return res.send({ "Lista de usuarios registrados:": usuariosObtenidos })
    })
}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var parametros = req.body;

    Usuario.findOne({ _id: idUsuario }, (error, usuarioEncontrado) => {
        if (error) return res.status(500).send({ mesaje: "Usuario no encontrado" });

        if (req.user.rol == "Admin" && usuarioEncontrado.rol == "Organizador") {

            Usuario.findByIdAndUpdate(idUsuario, parametros, { new: true }, (error, usuarioActualizada) => {
                if (error) return res.status(500).send({ mesaje: "Error de la petición" });
                if (!usuarioActualizada) return res.status(500).send({ mensaje: "Error al editar el Usuario" });

                usuarioActualizada.password = undefined;
                return res.status(200).send({
                    Usuario: usuarioActualizada, nota: "Usuario organizador editado exitosamente"
                });
            });

        } else if (req.user.rol == "Organizador" && req.user.sub == idUsuario) {

            parametros.rol = "Organizador"

            Usuario.findByIdAndUpdate(idUsuario, parametros, { new: true }, (error, usuarioActualizada) => {
                if (error) return res.status(500).send({ mesaje: "Error de la petición" });
                if (!usuarioActualizada) return res.status(500).send({ mensaje: "Error al editar el Usuario" });

                usuarioActualizada.password = undefined;
                return res.status(200).send({
                    Usuario: usuarioActualizada, nota: "Perfil editado exitosamente"
                });
            });

        } else if (req.user.rol == "Admin" && req.user.sub == idUsuario) {

            Usuario.findByIdAndUpdate(idUsuario, parametros, { new: true }, (error, usuarioActualizada) => {
                if (error) return res.status(500).send({ mesaje: "Error de la petición" });
                if (!usuarioActualizada) return res.status(500).send({ mensaje: "Error al editar el Usuario" });

                usuarioActualizada.password = undefined;
                return res.status(200).send({
                    Usuario: usuarioActualizada, nota: "Perfil admin editado exitosamente"
                });
            });

        } else {
            return res.status(500).send({ error2: "No puede editar a este usuario" });
        }
    })
}

function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    Usuario.findOne({ _id: idUsuario }, (error, usuarioEncontrado) => {
        if (error) return res.status(500).send({ mesaje: "Usuario no encontrado" });

        if (req.user.sub == idUsuario) {

            Usuario.findByIdAndDelete(idUsuario, (error, usuarioEliminado) => {
                if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                if (!usuarioEliminado) return res.status(404).send({ mensaje: "Error al eliminar el usuario1" });

                return res.status(200).send({ "Perfil eliminado con exito1": usuarioEliminado });
            })

        } else if (req.user.rol == "Admin" && usuarioEncontrado.rol == "Organizador") {

            Usuario.findByIdAndDelete(idUsuario, (error, usuarioEliminado) => {
                if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                if (!usuarioEliminado) return res.status(404).send({ mensaje: "Error al eliminar el usuario2" });

                return res.status(200).send({ "Usuario eliminado con exito2": usuarioEliminado });
            })

        } else {
            return res.status(500).send({ error: "No puede eliminar a este usuario" });
        }
    });
}







module.exports = {
    Login,
    Admin,
    Registrar,
    verUsuarios,
    editarUsuario,
    eliminarUsuario
}