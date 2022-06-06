const mongoose = require('mongoose');
const app = require('./app');

const torneoController = require('./src/controladores/Deportivo_Admin.controller');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6BM2_U2', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Se encuentra conectado a la base de datos");
 

    app.listen(process.env.PORT || 7000, function () {

        console.log("Puerto 7000, ejecución de Torneos, exitosa");
        torneoController.Admin("","");
        console.log("ADMINISTRADOR: Usu:ADMIN, Pass:***********" );
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("-------------------------------------------------------------------------------------------------");
    })

}).catch(error => console.log(error));