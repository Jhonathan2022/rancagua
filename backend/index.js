
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var key = require('./service/key')
const port = process.env.PORT || 3848
;
// const port = key.PORT;
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/rancagua_gestiondesolicitudes', {useUnifiedTopology: true, useNewUrlParser : true ,useCreateIndex: true} ).then(()=>{
    console.log('La conexion a la DB fue realizada correctamente');
    app.listen(port, () =>{
        console.log("Servidor se encuentra funcionando rancagua_gestiondesolicitudes")
    });
}).catch(err => console.log(err));

