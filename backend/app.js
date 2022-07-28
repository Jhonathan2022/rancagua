'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var path = require('path');



//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//CORS
app.set('trust proxy', true);


//CARGAR RUTAS
var administrador_routes = require('./routes/administrador/administrador');
var solicitud_routes = require('./routes/solicitud/solicitud');






//RUTAS
app.use(cors({
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']

}));

app.use('/api', administrador_routes);
app.use('/api', solicitud_routes);







//HEADERS
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
  });
  
  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
  });
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

    next();

});

module.exports = app;