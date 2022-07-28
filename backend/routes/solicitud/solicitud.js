'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');
var SolicitudController = require('../../controller/solicitud/solicitud');

api.post('/guardarSolicitud', SolicitudController.saveSolicitud);
api.get('/getSolicitudes',md_auth.ensureAuth, SolicitudController.getSolicitudes);
api.get('/getSolicitudesResumen',md_auth.ensureAuth, SolicitudController.getSolicitudesResumen);

// api.get('/totalPedidos',md_auth.ensureAuth, SolicitudController.totalPedidos);
// api.get('/totalPedidosFecha',md_auth.ensureAuth, SolicitudController.totalPedidosFecha);
api.get('/getSolicitudesArea/:id',md_auth.ensureAuth, SolicitudController.getSolicitudesArea);
api.put('/changeProceso',md_auth.ensureAuth,  SolicitudController.changeProceso);
api.put('/finalizarRequerimiento',md_auth.ensureAuth,  SolicitudController.finalizarRequerimiento);

module.exports = api;

