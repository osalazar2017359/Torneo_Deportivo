const PDFDocument = require('pdfkit-construct');
const fs = require('fs');
const Equipos = require("../modelos/equipos.model");
const Ligas = require("../modelos/ligas.model")
const Asigns = require("../modelos/asignacion_equipos.model");


function creandoPdf(req, res) {
    const doc = new PDFDocument;
    const idLiga = req.params.idLiga;

    const recopilation = new Array();

    const buscarNombres = new Array();
    const buscarGolesFavor = new Array();
    const buscarGolesContra = new Array();
    const buscarGolesDiferencia = new Array();
    const buscarPartidosJugados = new Array();

    Ligas.findById({ _id: idLiga }, (error, LigaEncontrada) => {

        Equipos.find({ liga: LigaEncontrada.nombreLiga }, (error, equiposEncontrados) => {
            if (equiposEncontrados)

                for (let i = 0; i < equiposEncontrados.length; i++) {

                    buscarNombres.push(equiposEncontrados[i].nombreEquipo);
                    buscarGolesFavor.push(Number(equiposEncontrados[i].GF));
                    buscarGolesContra.push(Number(equiposEncontrados[i].GC));
                    buscarGolesDiferencia.push(Number(equiposEncontrados[i].DG));
                    buscarPartidosJugados.push(Number(equiposEncontrados[i].PJ));

                    recopilation.push({
                        nombreEquipo: buscarNombres[i], GF: buscarGolesFavor[i], GC: buscarGolesContra[i],
                        DG: buscarGolesDiferencia[i], PJ: buscarPartidosJugados[i]
                    })

                }


            let nombreLiga = LigaEncontrada.nombreLiga;

            doc.pipe(fs.createWriteStream('src/tablas/Resultados_Liga_' + nombreLiga + ".pdf"));

            doc.info.Title = "Tabla de resultados de los equipos de la liga " + nombreLiga;
            doc.info.Author = "Omar Alexander Salazar de León - 2017359";

            doc.setDocumentHeader({ height: '17%' }, () => {
                doc.fontSize(30).text('TABLA DE RESULTADOS', {
                    width: 460, align: 'center', underline: 'true'
                });
                doc.fontSize(20).text('LIGA: ' + nombreLiga, {
                    width: 460, align: 'center', oblique: 'true', underline: 'true'
                });
            });

            doc.addTable([
                { key: 'nombreEquipo', label: 'Equipos', align: 'center', },
                { key: 'GF', label: 'GF', align: 'center' },
                { key: 'GC', label: 'GC', align: 'center' },
                { key: 'DG', label: 'DG', align: 'center' },
                { key: 'PJ', label: 'PJ', align: 'center' },
            ], recopilation, {
                border: { size: 1.5, color: '#09310a' },
                width: 'fill_body',
                striped: 'true',
                stripedColors: ["#d1ffce", "#8eca8f"],
                marginLeft: 30,
                marginRight: 30,


                headAlign: 'center',
                headBackground: '#085a00',
                headColor: '#FFF',
                headFontSize: 16,
                headHeight: 29,

                cellsFontSize: 10,
                cellsPadding: 8
            });

            doc.render();

            doc.end();
        })
    })
}


module.exports = {
    creandoPdf
}