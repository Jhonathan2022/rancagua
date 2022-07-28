'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');
var AdministradorController = require('../../controller/administrador/administrador');


//Enviar

api.post('/guardarAdmin', md_auth.ensureAuth, AdministradorController.saveAdministrador);

api.post('/saveUsuarioMunicipal', md_auth.ensureAuth, AdministradorController.saveUsuarioMunicipal);
api.get('/listarAdminDashboard', md_auth.ensureAuth, AdministradorController.listarAdministrador);
api.get('/listarAdmin', md_auth.ensureAuth, AdministradorController.listarAdmin);

api.delete('/eliminarAdminDashboard/:id', md_auth.ensureAuth, AdministradorController.eliminarAdministrador);
api.put('/actualizarAdminDashboard/', md_auth.ensureAuth, AdministradorController.actualizarAdministrador);
api.put('/actualizarAdmin/', md_auth.ensureAuth, AdministradorController.actualizarAdmin);

api.post('/changePassDashboard', AdministradorController.changePass);
api.post('/recoveryPassDashboard', AdministradorController.recoveryPass);
api.post('/loginDashboard', AdministradorController.loginAdmin);

api.get('/validarAdmin/:id', md_auth.ensureAuth, AdministradorController.validarAdmin);

api.post('/createArea', md_auth.ensureAuth, AdministradorController.createArea);
api.get('/getArea', AdministradorController.getArea);
api.get('/getAreaBytipos', AdministradorController.getAreaBytipos);
api.put('/putArea/', md_auth.ensureAuth, AdministradorController.putArea);

api.post('/createTipoSolicitud', md_auth.ensureAuth, AdministradorController.createTipoSolicitud);
api.get('/getTipoSolicitud', AdministradorController.getTipoSolicitud);
api.put('/putTipoSolicitud/', md_auth.ensureAuth, AdministradorController.putTipoSolicitud);
api.delete('/deleteTipoSolicitud/:id', md_auth.ensureAuth, AdministradorController.deleteTipoSolicitud);

module.exports = api;
