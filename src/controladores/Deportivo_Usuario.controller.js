const Liga = require('../modelos/ligas.model');
const Equipo = require('../modelos/equipos.model');
const Asigna = require('../modelos/asignacion_equipos.model');
const Jorns = require('../modelos/jornadas.model')


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CRUD LIGAS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function verLigas(req, res) {
    Liga.find({ idUsuario: req.user.sub }, (error, ligasObtenidas) => {
        if (error) return res.send({ mensaje: "error:" + error })
        for (let i = 0; i < ligasObtenidas.length; i++) {
        }

        return res.send({ Ligas: ligasObtenidas, t })

    })
}

function crearLiga(req, res) {
    var parametros = req.body;
    var ligaModelo = new Liga();

    if (parametros.nombre) {

        Liga.findOne({ nombreLiga: parametros.nombre }, (error, ligaEncontrada) => {
            if (error) return res.status(500).send({ mensaje: "Error de la petición" });
            if (!ligaEncontrada) {

                ligaModelo.nombreLiga = parametros.nombre;
                ligaModelo.idUsuario = req.user.sub;

                ligaModelo.save((error, ligaGuardada) => {
                    if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                    if (!ligaGuardada) return res.status(500).send({ mensaje: "Error, no se agrego ninguna liga" });

                    return res.status(200).send({
                        Liga: ligaGuardada, nota: "Liga agregada exitosamente"
                    });
                });

            } else {
                return res.status(500).send({ mensaje: "Esta liga ya esta registrada" })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "Envie los parametros obligatorios" });
    }
}

function editarLiga(req, res) {
    var idLiga = req.params.idLiga;
    var parametros = req.body;

    Liga.findOne({ _id: idLiga }, (error, ligaEncontrada) => {
        console.log(req.user.sub)
        console.log(ligaEncontrada.idUsuario)
        if (!ligaEncontrada) {
            return res.status(500).send({ mensaje: "No existe esta liga" });

        } else {
            if (req.user.sub !== ligaEncontrada.idUsuario) {
                return res.status(500).send({ mensaje: "No puede editar ligas de otros organizadores" });

            } else {
                Liga.findByIdAndUpdate(idLiga, parametros, { new: true }, (error, ligaActualizada) => {
                    if (error) return res.status(500).send({ mesaje: "Error de la petición" });
                    if (!ligaActualizada) return res.status(500).send({ mensaje: "Error al editar el empleado" });

                    return res.status(200).send({
                        Liga: ligaActualizada, nota: "Liga actualizada exitosamente"
                    });
                });
            }
        }

    });
}

function eliminarLiga(req, res) {
    var idLiga = req.params.idLiga;

    Liga.findOne({ _id: idLiga }, (error, ligaEncontrada) => {
        if (ligaEncontrada) {

            if (req.user.sub != ligaEncontrada.idUsuario) {
                return res.status(500).send({ mensaje: "No se puede borrar Ligas de otros organizadores" });

            } else {
                Liga.findByIdAndDelete(idLiga, (error, ligaEliminada) => {
                    if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                    if (!ligaEliminada) return res.status(404).send({ mensaje: "Error al eliminar la liga" });

                    return res.status(200).send({
                        Liga: ligaEliminada, nota: "Eliminada con exito"
                    });
                });
            }
        } else {
            return res.status(500).send({ mensaje: "No existe esta liga" });
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CRUD EQUIPOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function verEquipos(req, res) {
    Equipo.find({ idUsuario: req.user.sub }, (error, equiposObtenidos) => {
        if (error) return res.send({ mensaje: "error:" + error })
        for (let i = 0; i < equiposObtenidos.length; i++) {
        }
        return res.send({ Equipos: equiposObtenidos })

    })
}

function crearEquipo(req, res) {
    var parametros = req.body;
    var equipoModelo = new Equipo();

    if (parametros.nombre && parametros.pais) {

        Equipo.findOne({ nombreEquipo: parametros.nombre }, (error, equipoBuscado) => {
            if (error) return res.status(500).send({ mensaje: "Error de la petición" });
            if (equipoBuscado) return res.status(500).send({ mensaje: "No se puede volver a agregar el mismo equipo" });

            equipoModelo.nombreEquipo = parametros.nombre;
            equipoModelo.pais = parametros.pais;
            equipoModelo.idUsuario = req.user.sub;

            equipoModelo.save((error, equipoGuardado) => {
                if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                if (!equipoGuardado) return res.status(500).send({ mensaje: "Error, no se agrego ningun equipo" });

                return res.status(200).send({
                    Equipo: equipoGuardado, nota: "Equipo agregado exitosamente"
                });
            });
        })
    } else {
        return res.status(500).send({ mensaje: "Envie los parametros obligatorios" });
    }
}

function editarEquipo(req, res) {
    var idEqui = req.params.idEquipo;
    var parametros = req.body;

    Equipo.findOne({ _id: idEqui }, (error, equipoEncontrado) => {
        if (equipoEncontrado) {

            if (req.user.sub !== equipoEncontrado.idUsuario) {
                return res.status(500).send({ mensaje: "No puede editar equipos de otros organizadores" });

            } else {
                Equipo.findByIdAndUpdate(idEqui, parametros, { new: true }, (error, equipoActualizado) => {
                    if (error) return res.status(500).send({ mesaje: "Error de la petición" });
                    if (!equipoActualizado) return res.status(500).send({ mensaje: "Error al editar el empleado" });

                    return res.status(200).send({
                        Equipo: equipoActualizado, nota: "Equipo actualizado exitosamente"
                    });
                });
            }
        } else {
            return res.status(500).send({ mensaje: "No existe este equipo" });
        }
    });
}

function eliminarEquipo(req, res) {
    var idEqui = req.params.idEquipo;

    Equipo.findOne({ _id: idEqui }, (error, equipoEncontrado) => {
        if (equipoEncontrado) {

            if (req.user.sub !== equipoEncontrado.idUsuario) {
                return res.status(500).send({ mensaje: "No se puede borrar Equipo de otros organizadores" });

            } else {
                Equipo.findByIdAndDelete(idEqui, (error, equipoEliminado) => {
                    if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                    if (!equipoEliminado) return res.status(404).send({ mensaje: "Error al eliminar el equipo" });

                    return res.status(200).send({
                        Equipo: equipoEliminado, nota: "Eliminado con exito"
                    });
                });
            }
        } else {
            return res.status(500).send({ mensaje: "No existe este equipo" });
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CRUD ASIGNACIÓN LIGAS-EQUIPOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function asignarEquipos(req, res) {
    var parametros = req.body;
    var asigModelo = new Asigna();

    if (parametros.nombreLiga && parametros.nombreEquipo) {

        Liga.findOne({ nombreLiga: { $regex: parametros.nombreLiga, $options: 'i' } }, (error, LigaEncontrada) => {
            if (error) return res.status(500).send({ mensaje: "Error de la petición" });
            if (!LigaEncontrada) return res.status(500).send({ mensaje: "Esta liga no existe" });

            Equipo.findOne({ nombreEquipo: { $regex: parametros.nombreEquipo, $options: 'i' } }, (error, EquipoEncontrado) => {
                if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                if (!EquipoEncontrado) return res.status(500).send({ mensaje: "Este equipo no existe2" });

                Asigna.find({ idLiga: LigaEncontrada._id }/*)*/,/*.populate('idLiga').exec(*/(error, asignacionesEncontradas) => {
                    if (asignacionesEncontradas.length < 10) {

                        Asigna.findOne({ nombreEquipo: EquipoEncontrado.nombreEquipo }, (error, equiposAsigEncontrados) => {
                            if (equiposAsigEncontrados) return res.status(400).send({ mensaje: "No puede asignar este equipo más de 1 vez" });

                            for (let i = 0; i < asignacionesEncontradas.length; i++) {
                                if (asignacionesEncontradas[i].nombreEquipo == EquipoEncontrado.nombreEquipo)
                                    return res.status(400).send({ mensaje: "No puede asignar este equipo de nuevo" });
                            }

                            asigModelo.idLiga = LigaEncontrada._id;
                            asigModelo.nombreLiga = LigaEncontrada.nombreLiga;
                            asigModelo.idEquipo = EquipoEncontrado._id;
                            asigModelo.nombreEquipo = EquipoEncontrado.nombreEquipo;

                            asigModelo.save((error, asigGuardado) => {
                                if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                                if (!asigGuardado) return res.status(500).send({ mensaje: "Error, no se asigno a ningun Estudiante" });

                                Equipo.findOneAndUpdate({ nombreEquipo: EquipoEncontrado.nombreEquipo }, { liga: LigaEncontrada.nombreLiga },
                                    { new: true }, (error, equipoActualizado) => {
                                        if (error) return res.status(500).send({ mensaje: "Error de la petición" });
                                        if (!equipoActualizado) return res.status(500).send({ mensaje: "Error, no se añadio la liga al equipo" });

                                        return res.status(200).send({ asignacion: asigGuardado, nota: "Asignacion realizada exitosamente" });
                                    })
                            })
                        });
                    } else {
                        return res.send({ mensaje: "Solo se pueden asignar maximo 10 Equipos por Liga" })
                    }
                })
            })
        })

    } else {
        return res.status(500).send({ mensaje: "Envie los parametros obligatorios" });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JORNADAS Y PARTIDOS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generarJornadas(req, res) { //PROBLEM CON LOS NUMEROS DE LAS JORNADAS
    var idLiga = req.params.idLiga;
    var jornadaModelo = new Jorns();

    Liga.findById({ _id: idLiga }, (error, LigaEncontrada) => { //busco datos de la liga
        if (error) return res.status(500).send({ mensaje: "Error de la petición1" });
        if (!LigaEncontrada) return res.status(500).send({ mensaje: "Esta liga no existe" });

        if (LigaEncontrada.idUsuario == req.user.sub) {

            Asigna.find({ idLiga: idLiga }, (error, LigaEquiposEncontrados) => { //busco los equipos que estan asignados a esa liga
                if (error) return res.status(500).send({ mensaje: "Error de la petición2" });
                if (!LigaEquiposEncontrados) return res.status(500).send({ mensaje: "No se encontro esta liga" });

                let cantidadEquipos = LigaEquiposEncontrados.length;
                let cantidadTotal;

                if ((Number(cantidadEquipos) % 2) == 0) {
                    cantidadTotal = Number(cantidadEquipos) - 1;
                } else if ((Number(cantidadEquipos) % 2) == 1) {
                    cantidadTotal = Number(cantidadEquipos);
                }

                Jorns.find({ Liga: LigaEncontrada.nombreLiga }, (error, JornadasActuales) => {
                    if (JornadasActuales.length < Number(cantidadTotal)) {
                        /*const numero = new Array(); const ligas = new Array(); const jorn = new Array();
        
                        for (let j = 0; j < cantidadTotal; j++) {
        
                            numero.push(j);
                            ligas.push(LigaEncontrada.nombreLiga);
        
                            jorn.push({ No_Jornada: numero[j], Liga: ligas[j] })
        
                        }
        
                        jornadaModelo.No_Jornada = jorn.No_Jornada;
                        jornadaModelo.Liga = jorn.Liga;*/

                        jornadaModelo.Liga = LigaEncontrada.nombreLiga;
                        jornadaModelo.No_Jornada = (Number(JornadasActuales.length) + 1);

                        jornadaModelo.save((error, jornadaGuardada) => {
                            if (error) return res.status(500).send({ mensaje: "Error de la petición3" });
                            if (!jornadaGuardada) return res.status(500).send({ mensaje: "Error, no se agrego ninguna jornada" });

                            return res.status(200).send({
                                Jornadas: jornadaGuardada, PORFAVOR: "PORFAVOR, SIGA GENERANDO JORNADAS HASTA LLEGAR AL MAXIMO DEBIDO", nota: "Jornada agregada exitosamente"
                            });
                        })
                    } else {
                        return res.status(500).send({ Error: "Maximo de jornadas de esta liga, alcanzado" });
                    }
                });
            });
        } else {
            return res.status(500).send({ error: "No puede usar controlar una liga ajena" });
        }
    });
}

function agregarYPuntuarPartidos(req, res) {
    const idJornada = req.params.idJornada;
    const parametros = req.body;

    if (parametros.equipo1 && parametros.puntuacion1 && parametros.equipo2 && parametros.puntuacion2) {

        Equipo.findOne({ nombreEquipo: { $regex: parametros.equipo1, $options: 'i' } }, (error, equipo1Listo) => {
            if (error) return res.status(500).send({ mensaje: "Error1 en la petición" });
            if (!equipo1Listo) return res.status(500).send({ mensaje: "Error, no existe este equipo1" });

            Equipo.findOne({ nombreEquipo: { $regex: parametros.equipo2, $options: 'i' } }, (error, equipo2Listo) => {
                if (error) return res.status(500).send({ mensaje: "Error2 en la petición" });
                if (!equipo2Listo) return res.status(500).send({ mensaje: "Error, no existe este equipo2" });

                Jorns.findById({ _id: idJornada }, (error, jornadaUbicada) => {
                    if (error) return res.status(500).send({ mensaje: "Error3 en la petición" });
                    if (!jornadaUbicada) return res.status(500).send({ mensaje: "Error, no se encontro la jornada" });

                    Liga.findOne({ nombreLiga: jornadaUbicada.Liga }, (error, LIGA) => {
                        if (error) return res.status(500).send({ mensaje: "Error3.1 en la petición" });
                        if (!LIGA) return res.status(500).send({ mensaje: "Error, no se encontro la jornada" });


                        Asigna.find({ idLiga: LIGA._id }, (error, asignacionesEncontradas) => {
                            let maximoPartidos;
                            let totalPartidos = asignacionesEncontradas.length;

                            if (asignacionesEncontradas.length % 2 == 0) {
                                maximoPartidos = Number(totalPartidos) / 2

                            } else if (asignacionesEncontradas.length % 2 == 1) {
                                maximoPartidos = (Number(totalPartidos) - 1) / 2
                            }

                            if (jornadaUbicada.partidos.length < Number(maximoPartidos)) {

                                let equipo1Coincidiente; let equipo2Coincidiente;

                                for (let b = 0; b < jornadaUbicada.partidos.length; b++) {
                                    if (jornadaUbicada.partidos[b].equipo1 == equipo1Listo.nombreEquipo) {
                                        equipo1Coincidiente = jornadaUbicada.partidos[b].equipo1

                                    } else if (jornadaUbicada.partidos[b].equipo2 == equipo1Listo.nombreEquipo) {
                                        equipo1Coincidiente = jornadaUbicada.partidos[b].equipo2
                                    }
                                }
                                for (let b = 0; b < jornadaUbicada.partidos.length; b++) {
                                    if (jornadaUbicada.partidos[b].equipo1 == equipo2Listo.nombreEquipo) {
                                        equipo2Coincidiente = jornadaUbicada.partidos[b].equipo1

                                    } else if (jornadaUbicada.partidos[b].equipo2 == equipo2Listo.nombreEquipo) {
                                        equipo2Coincidiente = jornadaUbicada.partidos[b].equipo2
                                    }
                                }

                                if ((equipo1Coincidiente != equipo1Listo.nombreEquipo) && (equipo2Coincidiente != equipo2Listo.nombreEquipo) && (equipo1Listo != equipo2Listo)) {

                                    Jorns.findByIdAndUpdate({ _id: idJornada }, {
                                        $push: {
                                            partidos: {
                                                equipo1: equipo1Listo.nombreEquipo, puntuacion1: parametros.puntuacion1, equipo2: equipo2Listo.nombreEquipo,
                                                puntuacion2: parametros.puntuacion2
                                            }
                                        }
                                    }, { new: true }, (error, partidoAgregado) => {
                                        if (error) return res.status(500).send({ mensaje: "Error4 en la petición2" });
                                        if (!partidoAgregado) return res.status(500).send({ mensaje: "Error al agregar un partido" });

                                        let diferenciaGoles1 = Number(parametros.puntuacion1) - Number(parametros.puntuacion2)
                                        let diferenciaGoles2 = Number(parametros.puntuacion2) - Number(parametros.puntuacion1)

                                        Equipo.findByIdAndUpdate({ _id: equipo1Listo._id },
                                            { $inc: { GF: parametros.puntuacion1, GC: parametros.puntuacion2, DG: diferenciaGoles1, PJ: 1 } },
                                            { new: true }, (error, equipoActualizado) => {
                                                if (error) return res.status(500).send({ mensaje: "Error5 en la petición2" });
                                                if (!equipoActualizado) return res.status(500).send({ mensaje: "Error al agregar un partido" });

                                                Equipo.findByIdAndUpdate({ _id: equipo2Listo._id },
                                                    { $inc: { GF: parametros.puntuacion2, GC: parametros.puntuacion1, DG: diferenciaGoles2, PJ: 1 } },
                                                    { new: true }, (error, equipoActualizado) => {
                                                        if (error) return res.status(500).send({ mensaje: "Error6 en la petición2" });
                                                        if (!equipoActualizado) return res.status(500).send({ mensaje: "Error al agregar un partido" });

                                                        return res.status(200).send({ "+": partidoAgregado });
                                                    })
                                            })
                                    })
                                } else {
                                    return res.status(500).send({ error: "No puede jugar un equipo 2 veces en la misma Jornada" });
                                }
                            } else {
                                return res.status(500).send({ error: "No pueden haber mas de: " + maximoPartidos + " partidos por jornada" });
                            }
                        });
                    });
                });
            });
        });

    } else {
        return res.status(404).send({ error: "Envie los datos obligatorios" });
    }

}

function tablaCalificacion(req, res) { //PROBLEM
    var idLiga = req.params.idLiga;

    Liga.findById(idLiga, (error, ligaEncontrada) => {
        if (error) return res.status(500).send({ mensaje: "Error de la petición1" });
        if (!ligaEncontrada) return res.status(500).send({ mensaje: "No se encontro esta liga" });

        Equipo.find({ liga: ligaEncontrada.nombreLiga }, (error, equiposEncontrados) => {
            if (error) return res.status(500).send({ mensaje: "Error de la petición3" });
            if (!equiposEncontrados) return res.status(500).send({ mensaje: "No se encontraron equipos" });

            return res.status(200).send({ CALIFICACIÓN: equiposEncontrados });
        }).sort({ GF: -1 })
    })
}


module.exports = {
    verLigas,
    crearLiga,
    editarLiga,
    eliminarLiga,
    verEquipos,
    crearEquipo,
    editarEquipo,
    eliminarEquipo,
    asignarEquipos,
    generarJornadas,
    agregarYPuntuarPartidos,
    tablaCalificacion
}