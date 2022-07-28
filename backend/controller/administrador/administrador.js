'use strict'

var Administrador = require('../../models/administrador/administrador');
var Area = require('../../models/area/area');
var TipoSolicitud = require('../../models/area/tipoSolicitud');

const bcrypt = require('bcrypt');
var jwt = require('../../service/jwt');
var CREDENTIAL = require('../../service/key');

const nodemailer = require('nodemailer');
const emailExists = require('email-exists')

function crearcodigo() {
    var text = "";
    var paleta = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 10; i++) text += paleta.charAt(Math.floor(Math.random() * paleta.length));
    return text;
}

function saveAdministrador(req, res) {
    var administrador = new Administrador();
    var cuerpo = req.body;
    if (cuerpo.email && cuerpo.nombre && cuerpo.rut) {
        Administrador.findOne({ email: cuerpo.email.toLowerCase(), rut: cuerpo.rut.toLowerCase() }).exec((err, administradorEncontrado) => {
            if (err) return res.status(500).send({ message: 'Error en la petición de administradires' });
            if (administradorEncontrado) {
                res.status(404).send({ usuario: 'el administrador ya existe', existe: true })
            } else {
                administrador.nombre = cuerpo.nombre.toLowerCase();
                administrador.apellido = cuerpo.apellido.toLowerCase();
                administrador.email = cuerpo.email.toLowerCase();
                administrador.telefono = cuerpo.telefono.toLowerCase();
                var rut = cuerpo.rut.toLowerCase().replace(/-/g, '')
                rut = String(rut).replace(/\./g, '')
                administrador.rut = (String(rut).substring(0, (rut.length) - 1) + '-' + String(rut).substring((rut.length) - 1, rut.length))
                // administrador.rut = ;
                administrador.role = cuerpo.role;
                var salt = bcrypt.genSaltSync();
                var cont = crearcodigo();
                var hash = bcrypt.hashSync(cont, salt);
                administrador.pass = hash;
                nodemailer.createTestAccount((err, account) => {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        //host: 'smtp.gmail.com',
                        //port: 465,
                        //secure: true, // true for 465, false for other ports
                        auth: {
                            user: CREDENTIAL.credential.usr,
                            pass: CREDENTIAL.credential.pass
                        },
                    });
                    let mailOptions = {
                        from: '"Soporte" <soporte.formulario@gmail.com>', // sender address
                        to: administrador.email, // list of receivers
                        subject: 'Creación exitosa de Administrador', // Subject line
                        text: 'Se ha creado tu cuenta de Administrador exitosamente', // plain text body
                        html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Se ha creado correctamente tu cuenta</div><table align="center" style="margin-top:8px"><tbody><tr style="line-height:normal"><td align="right" style="padding-right:8px"><img width="20" height="20" style="width:20px;height:20px;vertical-align:sub;border-radius:50%" src="https://ci4.googleusercontent.com/proxy/QpsGaULeBaBhhOTpb-uwGsICda8b1ae95rM7JtYlDtcjbrJ_fDlrGcQ9nUwocVilT_dWdlntnRieTr4GY_IFycf2zxXXuPXiHCdY7G5yRw7uJHHhalp2NYvY=s0-d-e1-ft#https://www.gstatic.com/accountalerts/email/anonymous_profile_photo.png" class="CToWUd"></td><td><a style="font-family:">' + administrador.nombre.toUpperCase() + ' ' + administrador.apellido.toUpperCase() + '</a></td></tr></tbody></table></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">A continuación encontraras tu usuario y contraseña temporal para acceder al Dashboard de Gestión de Solicitudes. Al momento de ingresar se te pedira cambiar tu contraseña por una nueva.<br><a href="prueba.smtrack.cl">prueba.smtrack.cl</a><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center;pointer-events: none; cursor: default; text-decoration: none; color: black;">Usuario: ' + administrador.email + '</div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">Contraseña: ' + cont + '</div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Si tu no has solicitado la creación de esta cuenta, contáctese a soporte.formulario@gmail.com</div></div></div></div>',
                        attachments: [
                            {   // file on disk as an attachment
                                filename: 'ok.png',
                                path: __dirname + '/../../img/ok.png', // stream this file,
                                cid: 'correcto',
                            }],
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(404).send({ message: 'No se ha podido registrar el usuario', error });
                        } else {
                            administrador.save((error, adminStored) => {
                                if (error) return res.status(500).send({ message: 'Error al registrar administrador', error: error.errors });
                                if (adminStored) {
                                    res.status(200).send({ usuario: adminStored, nuevo: true });
                                } else {
                                    res.status(404).send({ message: 'No se ha podido registrar el administrador' });
                                }
                            });
                        }
                    });
                });
            }
        })
    } else {
        res.status(404).send({ message: 'Debe ingresar todos los campos requeridos' });
    }
}

function saveUsuarioMunicipal(req, res) {
    var administrador = new Administrador();
    var cuerpo = req.body;
    if (cuerpo.email && cuerpo.nombre && cuerpo.rut) {
        Administrador.findOne({ rut: cuerpo.rut.toLowerCase() }).exec((err, administradorEncontrado) => {
            if (err) return res.status(500).send({ message: 'Error en la petición de administradires' });
            if (administradorEncontrado) {
                res.status(404).send({ usuario: 'el administrador ya existe', existe: true })
            } else {
                Administrador.findOne({ email: cuerpo.email.toLowerCase() }).exec((err, administradorEncontrado2) => {
                    if (administradorEncontrado2) return res.status(404).send({ usuario: 'el administrador ya existe', existe: true })
                    administrador.nombre = cuerpo.nombre.toLowerCase();
                    administrador.apellido = cuerpo.apellido.toLowerCase();
                    administrador.email = cuerpo.email.toLowerCase();
                    administrador.telefono = cuerpo.telefono;
                    administrador.area = cuerpo.area;
                    var rut = cuerpo.rut.toLowerCase().replace(/-/g, '')
                    rut = String(rut).replace(/\./g, '')
                    administrador.rut = (String(rut).substring(0, (rut.length) - 1) + '-' + String(rut).substring((rut.length) - 1, rut.length))
                    // administrador.rut = ;
                    administrador.role = 'ROLE_USER';
                    var salt = bcrypt.genSaltSync();
                    var cont = crearcodigo();
                    var hash = bcrypt.hashSync(cont, salt);
                    administrador.pass = hash;
                    nodemailer.createTestAccount((err, account) => {
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            //host: 'smtp.gmail.com',
                            //port: 465,
                            //secure: true, // true for 465, false for other ports
                            auth: {
                                user: CREDENTIAL.credential.usr,
                                pass: CREDENTIAL.credential.pass
                            },
                        });
                        let mailOptions = {
                            from: '"Soporte" <soporte.formulario@gmail.com>', // sender address
                            to: administrador.email, // list of receivers
                            subject: 'Creación exitosa de Usuario Municipal', // Subject line
                            text: 'Se ha creado tu cuenta de Usuario exitosamente', // plain text body
                            html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Se ha creado correctamente tu cuenta</div><table align="center" style="margin-top:8px"><tbody><tr style="line-height:normal"><td align="right" style="padding-right:8px"><img width="20" height="20" style="width:20px;height:20px;vertical-align:sub;border-radius:50%" src="https://ci4.googleusercontent.com/proxy/QpsGaULeBaBhhOTpb-uwGsICda8b1ae95rM7JtYlDtcjbrJ_fDlrGcQ9nUwocVilT_dWdlntnRieTr4GY_IFycf2zxXXuPXiHCdY7G5yRw7uJHHhalp2NYvY=s0-d-e1-ft#https://www.gstatic.com/accountalerts/email/anonymous_profile_photo.png" class="CToWUd"></td><td><a style="font-family:">' + administrador.nombre.toUpperCase() + ' ' + administrador.apellido.toUpperCase() + '</a></td></tr></tbody></table></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">A continuación encontraras tu usuario y contraseña temporal para acceder al Dashboard de Gestión de Solicitudes. Al momento de ingresar se te pedira cambiar tu contraseña por una nueva.<br><a href="prueba.smtrack.cl">prueba.smtrack.cl</a><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center;pointer-events: none; cursor: default; text-decoration: none; color: black;">Usuario: ' + administrador.email + '</div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">Contraseña: ' + cont + '</div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Si tu no has solicitado la creación de esta cuenta, contáctese a soporte.formulario@gmail.com</div></div></div></div>',
                            attachments: [
                                {   // file on disk as an attachment
                                    filename: 'ok.png',
                                    path: __dirname + '/../../img/ok.png', // stream this file,
                                    cid: 'correcto',
                                }],
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return res.status(404).send({ message: 'No se ha podido registrar el usuario', error });
                            } else {
                                administrador.save((error, adminStored) => {
                                    if (error) return res.status(500).send({ message: 'Error al registrar Usuario', error: error.errors });
                                    if (adminStored) {
                                        res.status(200).send({ usuario: adminStored, nuevo: true });
                                    } else {
                                        res.status(404).send({ message: 'No se ha podido registrar el Usuario' });
                                    }
                                });
                            }
                        });
                    });
                })
            }

        })
    } else {
        res.status(404).send({ message: 'Debe ingresar todos los campos requeridos' });
    }
}

function listarAdmin(req, res) {
    Administrador.find({ role: { $in: ['ROLE_ALCALDE', 'ROLE_ADMIN'] }, activo: true }).exec((err, administradores) => {
        if (err) return res.status(500).send({ message: 'Error en la petición de administradores' });
        if (!administradores[0]) {
            res.status(404).send({ usuario: 'no hay administradores registrados' })
        } else {
            Area.populate(administradores, { path: 'area' }, (err, administradores) => {
                res.status(200).send({ administradores: administradores });
            })
        }
    })
}

function listarAdministrador(req, res) {
    Administrador.find({ role: { $nin: ['ROL_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ALCALDE'] }, activo: true }).exec((err, administradores) => {
        if (err) return res.status(500).send({ message: 'Error en la petición de administradores' });
        if (!administradores[0]) {
            res.status(404).send({ usuario: 'no hay administradores registrados' })
        } else {
            Area.populate(administradores, { path: 'area' }, (err, administradores) => {
                res.status(200).send({ administradores: administradores });
            })
        }
    })
}

function eliminarAdministrador(req, res) {
    var id_administrador = req.params.id;
    Administrador.updateOne({ _id: id_administrador }, { $set: { activo: false } }).exec((err, administrador) => {
        if (err) return res.status(500).send({ message: 'Error en la petición de administradores' });
        if (administrador.nModified > 0) {
            res.status(200).send({ eliminado: 'El administrador ha sido eliminado' });
        } else {
            res.status(404).send({ usuario: 'El administrador no ha sido eliminado, intentelo nuevamente' })
        }
    })
}

function actualizarAdministrador(req, res) {
    var cuerpo = req.body;
    Administrador.updateOne({ _id: cuerpo._id }, {
        $set: { nombre: cuerpo.nombre.toLowerCase(), apellido: cuerpo.apellido.toLowerCase(), telefono: cuerpo.telefono, email: cuerpo.email.toLowerCase(), area: cuerpo.area }
    }).exec((err, actualizado) => {
        if (actualizado.nModified > 0) {
            res.status(200).send({ message: 'administrador actualizado' })
        } else {
            res.status(404).send({ usuario: 'El administrador no ha sido actualizado, intentelo nuevamente' })
        }
    })
}

function actualizarAdmin(req, res) {
    var cuerpo = req.body;
    Administrador.updateOne({ _id: cuerpo._id }, {
        $set: { nombre: cuerpo.nombre.toLowerCase(), apellido: cuerpo.apellido.toLowerCase(), telefono: cuerpo.telefono, email: cuerpo.email.toLowerCase() }
    }).exec((err, actualizado) => {
        if (actualizado.nModified > 0) {
            res.status(200).send({ message: 'administrador actualizado' })
        } else {
            res.status(404).send({ usuario: 'El administrador no ha sido actualizado, intentelo nuevamente' })
        }
    })
}


function changePass(req, res) {
    var us = req.body;
    var pass = us.password;
    var newpass = us.newpass;
    var email = us.email.toLowerCase();
    if (us.password && us.newpass && us.email) {
        Administrador.findOne({ email: email, activo: true }).exec((err, usuario) => {
            if (err) return res.status(500).send({ message: 'Error con el servidor' });
            if (!usuario) {
                res.status(404).send({ message: 'No se ha podido encontrar el usuario' });
            } else {
                bcrypt.compare(pass, usuario.pass).then(resp => {
                    if (resp) {
                        var salt = bcrypt.genSaltSync();
                        var hash = bcrypt.hashSync(newpass, salt);
                        Administrador.updateOne({ _id: usuario._id }, { $set: { pass: hash, changePass: true, fechaModificacion: new Date() } }).exec((err, updUser) => {
                            if (err) return res.status(500).send({ message: 'Error con el servidor' });
                            res.status(200).send({ message: 'contraseña cambiada con exito', pass: true });
                        })

                    } else {
                        res.status(404).send({ message: 'contraseña incorrecta', pass: false });
                    }
                });
            }
        })
    } else {
        res.status(404).send({ message: 'Debe ingresar todos los campos requeridos' });
    }
}

function recoveryPass(req, res) {
    var us = req.body;
    var email = us.email.toLowerCase();
    if (us.email) {
        Administrador.findOne({ email: email, activo: true }).exec((err, usuario) => {
            if (err) return res.status(500).send({ message: 'Error con el servidor' });
            if (!usuario) {
                res.status(404).send({ message: 'No se ha podido encontrar el usuario o no ha cambiado su contraseña temporal' });
            } else {
                var salt = bcrypt.genSaltSync();
                var cont = crearcodigo();
                var hash = bcrypt.hashSync(cont, salt);
                nodemailer.createTestAccount((err, account) => {
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        //host: 'smtp.gmail.com',
                        //port: 465,
                        //secure: true, // true for 465, false for other ports
                        auth: {
                            user: CREDENTIAL.credential.usr,
                            pass: CREDENTIAL.credential.pass
                        },
                    });
                    let mailOptions = {
                        from: '"Soporte" <soporte.formulario@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: 'Recuperación de contraseña', // Subject line
                        text: 'Se ha creado una nueva contraseña exitosamente', // plain text body
                        html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Se ha restablecido correctamente tu contraseña</div><table align="center" style="margin-top:8px"><tbody><tr style="line-height:normal"><td align="right" style="padding-right:8px"><img width="20" height="20" style="width:20px;height:20px;vertical-align:sub;border-radius:50%" src="https://ci4.googleusercontent.com/proxy/QpsGaULeBaBhhOTpb-uwGsICda8b1ae95rM7JtYlDtcjbrJ_fDlrGcQ9nUwocVilT_dWdlntnRieTr4GY_IFycf2zxXXuPXiHCdY7G5yRw7uJHHhalp2NYvY=s0-d-e1-ft#https://www.gstatic.com/accountalerts/email/anonymous_profile_photo.png" class="CToWUd"></td><td><a style="font-family:">' + usuario.nombre.toUpperCase() + ' ' + usuario.apellido.toUpperCase() + '</a></td></tr></tbody></table></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">A continuación encontraras tu usuario y nueva contraseña temporal para el Dashboard de registro de Atención al Vecino. Al momento de ingresar se te pedira cambiar tu contraseña por una nueva.<br><a href="prueba.smtrack.cl">prueba.smtrack.cl</a><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center;pointer-events: none; cursor: default; text-decoration: none; color: black;">Usuario: ' + email + '</div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">Contraseña: ' + cont + '</div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Si tu no has solicitado la recuperación de contraseña, contáctese a soporte.formulario@gmail.com.</div></div></div></div>',
                        attachments: [
                            {   // file on disk as an attachment
                                filename: 'ok.png',
                                path: __dirname + '/../../img/ok.png', // stream this file,
                                cid: 'correcto',
                            }],
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                        } else {
                            Administrador.updateOne({ _id: usuario._id }, { $set: { pass: hash, changePass: false, fechaModificacion: new Date() } }).exec((err, updUser) => {
                                if (err) return res.status(500).send({ message: 'Error con el servidor' });
                                res.status(200).send({ message: 'contraseña cambiada con exito', pass: true });
                            })
                        }
                    });
                });
            }
        })
    } else {
        res.status(404).send({ message: 'Debe ingresar todos los campos requeridos' });
    }
}

function loginAdmin(req, res) {
    var params = req.body;
    Administrador.findOne({ email: params.email.toLowerCase(), activo: true }).exec((err, user) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })
        if (!user) return res.status(404).send({ message: 'Usuario invalido' })
        if (user) {
            bcrypt.compare(params.password, user.pass, (err, check) => {
                if (check) {
                    user.pass = null;
                    res.status(200).send({ message: 'login correcto', user: user, token: jwt.createToken(user) })
                } else {
                    res.status(404).send({ message: 'usuario invalido' })
                }
            });
        }
    })
}
function validarAdmin(req, res) {
    var id = req.params.id;
    Administrador.findOne({ _id: id }).exec((err, comp) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion', });
        if (!comp) return res.status(404).send({ message: 'admin no existe' })
        if (comp) {
            return res.status(200).send({ message: 'admin valido' })
        }
    })
}

function createArea(req, res) {
    var cuerpo = req.body;
    Area.findOne({ nombre: cuerpo.nombre.toLowerCase() }).exec((err, existe) => {
        if (existe) return res.status(404).send({ message: 'ya existe esta area creada', existe: true })
        if (!existe) {
            Area.findOne({ email: cuerpo.email.toLowerCase() }).exec((err, existe2) => {
                if (existe2) return res.status(404).send({ message: 'ya existe esta area creada', existe2: true })
                if (!existe2) {
                    var area = new Area()
                    area.nombre = cuerpo.nombre;
                    area.email = cuerpo.email;
                    area.create_at = new Date();
                    area.save((err, guardado) => {
                        if (err) return res.status(404).send({ message: 'error al registrar' })
                        if (guardado) return res.status(200).send({ message: 'se ha guardado el area' })
                    })
                }
            })
        }
    })
}

function getArea(req, res) {
    Area.find().sort({ nombre: 1 }).exec((err, areas) => {
        return res.status(200).send({ areas: areas })
    })
}

async function getAreaBytipos(req, res) {
    const areas = await Area.aggregate([
        { "$addFields": { "(_id)": { "$toString": "$_id" } } },
        {
            "$lookup": {
                "from": "tiposolicituds",
                "foreignField": ('area'),
                "localField": ('_id'),
                "as": "tipoSolicitud"
            }
        }
    ]).exec();
    if (areas.length > 0) {
        return res.status(200).send({ areas: areas })
    } else {
        return res.status(404).send({ message: 'area not fount' })
    }
}

function putArea(req, res) {
    Area.updateOne({ _id: req.body._id }, { $set: { nombre: req.body.nombre, email: req.body.email } }).exec((err, act) => {
        if (act.nModified > 0) {
            return res.status(200).send({ message: 'area actualizada' })
        } else {
            return res.status(404).send({ message: 'no se pudo actualziar el area' })
        }
    })
}

function createTipoSolicitud(req, res) {
    var cuerpo = req.body;
    TipoSolicitud.findOne({ nombre: cuerpo.nombre }).exec((err, existe) => {
        if (existe) return res.status(404).send({ message: 'ya existe creada esta solicitud' })
        if (!existe) {
            var solici = new TipoSolicitud();
            solici.nombre = cuerpo.nombre;
            solici.create_at = new Date()
            solici.area = cuerpo.area;
            solici.save((err, guardado) => {
                if (err) return res.status(404).send({ message: 'error al registrar' })
                if (guardado) return res.status(200).send({ message: 'se ha guardado la solicitud' })
            })
        }
    })
}

function getTipoSolicitud(req, res) {
    TipoSolicitud.find({ activo: true }).sort({ nombre: 1 }).exec((err, tipos) => {
        Area.populate(tipos, { path: 'area' }, (err, tipos) => {
            return res.status(200).send({ tipos: tipos })
        })

    })
}

function putTipoSolicitud(req, res) {
    TipoSolicitud.updateOne({ _id: req.body._id }, { $set: { nombre: req.body.nombre, fechaModificacion: new Date() } }).exec((err, act) => {
        if (act.nModified > 0) {
            return res.status(200).send({ message: 'solicitud actualizada' })
        } else {
            return res.status(404).send({ message: 'no se pudo actualziar la solicitud' })
        }
    })
}

function deleteTipoSolicitud(req, res) {
    TipoSolicitud.updateOne({ _id: req.params.id }, { $set: { activo: false, fechaModificacion: new Date() } }).exec((err, act) => {
        if (act.nModified > 0) {
            return res.status(200).send({ message: 'solicitud eliminada' })
        } else {
            return res.status(404).send({ message: 'no se pudo eliminar la solicitud' })
        }
    })
}


module.exports = {
    saveAdministrador,
    saveUsuarioMunicipal,
    listarAdministrador,
    eliminarAdministrador,
    actualizarAdministrador,
    changePass,
    recoveryPass,
    loginAdmin,
    actualizarAdmin,
    validarAdmin,
    createArea,
    getArea,
    putArea,
    createTipoSolicitud,
    getTipoSolicitud,
    putTipoSolicitud,
    deleteTipoSolicitud,
    listarAdmin,
    getAreaBytipos
}