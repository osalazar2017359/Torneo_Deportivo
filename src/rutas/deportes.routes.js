const express = require('express');
const usuariosController = require('../controladores/Deportivo_Admin.controller');
const torneoController = require('../controladores/Deportivo_Usuario.controller')

const md_autentificacion = require('../middlewares/autentificacion');
const md_autentificacion_rol = require('../middlewares/autentificacion_rol');
const tablaPdf = require('../PDFs/tablaResultados.pdf')


var api = express.Router();

api.post('/login', usuariosController.Login);

api.get('/usuarios', [md_autentificacion.Auth, md_autentificacion_rol.Admi], usuariosController.verUsuarios);
api.post('/registrar', usuariosController.Registrar);
api.put('/editarUsuario/:idUsuario', md_autentificacion.Auth, usuariosController.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autentificacion.Auth, usuariosController.eliminarUsuario);


api.get('/ligas', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.verLigas);
api.post('/crearLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.crearLiga);
api.put('/editarLiga/:idLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.editarLiga);
api.delete('/eliminarLiga/:idLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.eliminarLiga);

api.get('/equipos', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.verEquipos);
api.post('/crearEquipo', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.crearEquipo);
api.put('/editarEquipo/:idEquipo', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.editarEquipo);
api.delete('/eliminarEquipo/:idEquipo', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.eliminarEquipo);


api.post('/asignarEquipo', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.asignarEquipos);
api.post('/generarJornadas/:idLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.generarJornadas);
api.put('/partidosXJornada/:idJornada', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.agregarYPuntuarPartidos);
api.get('/tabla/:idLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], torneoController.tablaCalificacion);

api.get('/tablaPdf/:idLiga', [md_autentificacion.Auth, md_autentificacion_rol.Org], tablaPdf.creandoPdf);

module.exports = api;
