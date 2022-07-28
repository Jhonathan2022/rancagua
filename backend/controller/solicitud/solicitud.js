var Solicitud = require('../../models/solicitud/solicitud');
var Administrador = require('../../models/administrador/administrador');
var Area = require('../../models/area/area');
var TipoSolicitud = require('../../models/area/tipoSolicitud');
var CREDENTIAL = require('../../service/key');
var async = require("async");
const http = require('https');
const nodemailer = require('nodemailer');
// const emailExists = require('email-exists')
const emailcheckup = require("email-checkup");

var fs = require('fs');//file_system
var path = require('path');//Acceder a sistema de ruta de archivos

// const app = require('express')();
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer);

/* 
  var options = {
    key: fs.readFileSync('/etc/nginx/certs/rancagua.gestiondesolicitudes.cl/key.pem'),
    cert: fs.readFileSync('/etc/nginx/certs/rancagua.gestiondesolicitudes.cl/fullchain.pem'),
    ca:fs.readFileSync('/etc/nginx/certs/rancagua.gestiondesolicitudes.cl/ca.pem'),
    requestCert: false,
    rejectUnauthorized: false
  };
*/
let app = require('express')();
let httpServer = require('https').createServer(app); //agregar options en caso de descomentar los certificados
let io = require('socket.io')(httpServer);


io.on("connection", function (socket) {
    socket.on('new-message', function(data) {
        texto.push(data);
    });
    socket.on("escucha",(res)=>{
        console.log(res)
    })
    socket.on("disconnect", function () {
    });
});

const port = CREDENTIAL.PORT_SOCKET;
httpServer.listen(port, function () {
    console.log(`listening socket gestion de solicitudes on *:${port}`);
});

function saveSolicitud(req,res){
    var cuerpo = req.body;
    var solici = new Solicitud()
    solici.nombre = cuerpo.nombre;
    solici.rut = cuerpo.rut;
    solici.telefono = cuerpo.telefono;
    solici.direccion = cuerpo.direccion;
    solici.lat = cuerpo.lat;
    solici.lng = cuerpo.lng;
    solici.solicitud = cuerpo.solicitud;
    solici.requerimiento = cuerpo.requerimiento;
    solici.email = cuerpo.email;
    solici.create_at = new Date()
    Solicitud.find().countDocuments().exec((err,so)=>{
        solici.numero = so + 1;
        TipoSolicitud.findOne({_id:cuerpo.solicitud}).exec((err,tiposolicitud)=>{
            if (err) return res.status(500).send({ message: 'Error en la peticion', error: error.errors });
            if(!tiposolicitud) return res.status(404).send({message:'No se encontro la solicitud'})
            if(tiposolicitud){
                Area.findOne({_id:tiposolicitud.area}).exec((err,area)=>{
                    if (err) return res.status(500).send({ message: 'Error en la peticion', error: error.errors });
                    if(!area) return res.status(404).send({message:'No se encontro el area'})
                    if(area){
                        solici.area = area._id;
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
                                from: '"Gestor de Solicitudes" <soporte.formulario@gmail.com>', // sender address
                                to: null, // list of receivers
                                subject: 'Nuevo requerimiento ingresado #'+solici.numero, // Subject line
                                text: 'Se ha ingresado un nuevo requerimiento', // plain text body
                                html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Requerimiento Ingresado</div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:justify;">A continuación se encuentra el detalle del requerimiento ingresado en el formulario de Gestión de Solicitudes.<div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left;pointer-events: none; cursor: default; text-decoration: none; color: black;">Nombre: <span style="font-weight:initial;">'+solici.nombre+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;text-align:left;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Rut: <span style="font-weight:initial;">'+solici.rut+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Email: <span style="font-weight:initial;">'+solici.email+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Dirección: <span style="font-weight:initial;">'+solici.direccion+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Teléfono: <span style="font-weight:initial;">'+solici.telefono+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Tipo Solicitud: <span style="font-weight:initial;">'+tiposolicitud.nombre+'</span></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Requerimiento: <span style="font-weight:initial;">'+solici.requerimiento+'</span></div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Para cualquier consulta contáctese a soporte.formulario@gmail.com</div></div></div></div>',
                                attachments: [                                            
                                {   // file on disk as an attachment
                                    filename: 'ok.png',
                                    path: __dirname+'/../../img/ok.png', // stream this file,
                                    cid: 'correcto',
                                }],
                            };
                            const email_verifier = require('email-verifier-node');
                            email_verifier.verify_email(cuerpo.email)
                            .then( result => {
                                if(!result.format) return  res.status(404).send({ message:'No se ha podido enviar los correos',correo:true });
                                var emails = [area.email,cuerpo.email]
                                solici.save((err,guardado)=>{
                                    if(err) return res.status(404).send({message:'error al guardar',err})
                                    TipoSolicitud.updateOne({_id:cuerpo.solicitud},{$set:{solicitudes:tiposolicitud.solicitudes + 1}}).exec((err,act)=>{
                                        Area.updateOne({_id:tiposolicitud.area},{$set:{solicitudes:area.solicitudes + 1}}).exec((err,act)=>{
                                            io.emit('recargar',{recargar:true})
                                            async.each(emails, (to, callback)=>{
                                                mailOptions.to = to;
                                                transporter.sendMail(mailOptions,  (err)=> {
                                                    if (err) { 
                                                        callback(err);
                                                    } else { 
                                                        callback();
                                                    }
                                                });
                                            }, function(err){
                                                return  res.status(200).send({ message:'Se guardo pero hubo problema al enviar correos',err });
                                            }); 
                                            return res.status(200).send({message:'requerimiento guardado con exito'})
                                        })
                                    })
                                })
                            }).catch(err=>{
                                return  res.status(404).send({ message:'Correo invalido',correo:true });
                            })
                          
                        });
                    }
                })
            }
        })
    })
}


function eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup  = {};
    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }
  
    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }
  
    return nuevoArray;
  }

function getSolicitudes(req,res){
    Solicitud.find({}).sort({numero:-1}).exec((err,solicitudes)=>{
        if(!solicitudes[0]) return res.status(404).send({message:'no hya solicitudes ingresadas'})
        if(solicitudes[0]) {
            TipoSolicitud.populate(solicitudes,{path:'solicitud'},(err,solicitudes)=>{
                Area.populate(solicitudes,{path:'solicitud.area'},(err,solicitudes)=>{
                    Administrador.populate(solicitudes,{path:'usuario'},(err,solicitudes)=>{
                        Administrador.populate(solicitudes,{path:'usuarioCierre'},(err,solicitudes)=>{
                    // https://apis.digital.gob.cl/fl/feriados
                        var year = new Date().getFullYear()
                        http.get('https://apis.digital.gob.cl/fl/feriados/'+year, (resp) => {
                            let data = '';
                            resp.on('data', (chunk) => {
                            data += chunk;
                            });
                            resp.on('end', () => {
                                if(JSON.parse(data) != undefined){
                                    var feriados = []
                                    JSON.parse(data).forEach(f=>{
                                        feriados.push(f.fecha)
                                    })
                                    solicitudes.forEach(f=>{
                                        if(f.estado == 'Recepcionado'){
                                            var hoy = new Date();
                                            var dianohabil = []  
                                            var diferencia = hoy - new Date(f.create_at);
                                            var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                            var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                            var c = Math.floor((((diferencia/1000) / 60)));
                                            var inicial = new Date(f.create_at);
                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            while(inicial < hoy){
                                                if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                    dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                }
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            }
                                            var fechasoli = new Date(f.create_at).getFullYear()+'-'+(String(new Date(f.create_at).getMonth()+1).length == 1 ? '0'+(new Date(f.create_at).getMonth()+1) : new Date(f.create_at).getMonth()+1)+'-'+new Date(f.create_at).getDate()
                                            var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                            feriados.forEach(fe=>{
                                                if(fe>= fechasoli && fe <= hoyparse){
                                                    dianohabil.push({fecha:fe})
                                                }
                                            })
                                            dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                            a = a - (dianohabil.length * 24)
                                            b = b - (dianohabil.length)
                                            if(a>=120){
                                                f.tiempo = '+'+b+' días hábiles'
                                                f.color = '#c30c0c'
                                            }else{
                                                if(a<120 && a>=72){
                                                    f.color = '#ceb822'
                                                    f.tiempo = '+'+b+' días hábiles'
                                                }else{
                                                    if(a<72 && a>=48){
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a < 1){
                                                            f.tiempo = c+' minutos hábiles'
                                                        }else{
                                                            f.tiempo = a+' hrs hábiles'
                                                        }
                                                    }
                                                    f.color = '#43b535'
                                                }                                      
                                            }
                                            actualizarInterno(f)
                                        }else{
                                            if(f.estado == 'En proceso'){
                                                var hoy = new Date();
                                                var dianohabil = [] 
                                                var diferencia = hoy - new Date(f.fechaEnProceso);
                                                var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                var c = Math.floor((((diferencia/1000) / 60)));
                                                var inicial = new Date(f.fechaEnProceso);
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                while(inicial < hoy){
                                                    if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                        dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                    }
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                }
                                                var fechasoli = new Date(f.fechaEnProceso).getFullYear()+'-'+(String(new Date(f.fechaEnProceso).getMonth()+1).length == 1 ? '0'+(new Date(f.fechaEnProceso).getMonth()+1) : new Date(f.fechaEnProceso).getMonth()+1)+'-'+new Date(f.fechaEnProceso).getDate()
                                                var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                                feriados.forEach(fe=>{
                                                    if(fe>= fechasoli && fe <= hoyparse){
                                                        dianohabil.push({fecha:fe})
                                                    }
                                                })
                                                dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                                a = a - (dianohabil.length * 24)
                                                b = b - (dianohabil.length)
                                                if(a>=120){
                                                    f.tiempo = '+'+b+' días hábiles'
                                                    f.color = '#c30c0c'
                                                }else{
                                                    if(a<120 && a>=72){
                                                        f.color = '#ceb822'
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a<72 && a>=48){
                                                            f.tiempo = '+'+b+' días hábiles'
                                                        }else{
                                                            if(a < 1){
                                                                f.tiempo = c+' minutos hábiles'
                                                            }else{
                                                                f.tiempo = a+' hrs hábiles'
                                                            }
                                                        }
                                                        f.color = '#43b535'
                                                    }
                                                }
                                                actualizarInterno(f)
                                            }
                                        }
                                    })
                                    return res.status(200).send({solicitudes:solicitudes})
                                }else{
                                    solicitudes.forEach(f=>{
                                        if(f.estado == 'Recepcionado'){
                                            var hoy = new Date();
                                            var dianohabil = []  
                                            var diferencia = hoy - new Date(f.create_at);
                                            var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                            var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                            var c = Math.floor((((diferencia/1000) / 60)));
                                            var inicial = new Date(f.create_at);
                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            while(inicial < hoy){
                                                if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                    dianohabil.push(inicial)
                                                }
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            }
                                            a = a - (dianohabil.length * 24)
                                            b = b - (dianohabil.length)
                                            if(a>=120){
                                                f.tiempo = '+'+b+' días habiles'
                                                f.color = '#c30c0c'
                                            }else{
                                                if(a<120 && a>=72){
                                                    f.color = '#ceb822'
                                                    f.tiempo = '+'+b+' días habiles'
                                                }else{
                                                    if(a<72 && a>=48){
                                                        f.tiempo = '+'+b+' días habiles'
                                                    }else{
                                                        if(a < 1){
                                                            f.tiempo = c+' minutos hábiles'
                                                        }else{
                                                            f.tiempo = a+' hrs hábiles'
                                                        }
                                                    }
                                                    f.color = '#43b535'
                                                }
                                                actualizarInterno(f)
                                            }
                                        }else{
                                            if(f.estado == 'En proceso'){
                                                var hoy = new Date();
                                                var dianohabil = [] 
                                                var diferencia = hoy - new Date(f.fechaEnProceso);
                                                var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                var c = Math.floor((((diferencia/1000) / 60)));
                                                var inicial = new Date(f.fechaEnProceso);
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                while(inicial < hoy){
                                                    if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                        dianohabil.push(inicial)
                                                    }
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                }
                                                a = a - (dianohabil.length * 24)
                                                b = b - (dianohabil.length)
                                                if(a>=120){
                                                    f.tiempo = '+'+b+' días habiles'
                                                    f.color = '#c30c0c'
                                                }else{
                                                    if(a<120 && a>=72){
                                                        f.color = '#ceb822'
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a<72 && a>=48){
                                                            f.tiempo = '+'+b+' días hábiles'
                                                        }else{
                                                            if(a < 1){
                                                                f.tiempo = c+' minutos hábiles'
                                                            }else{
                                                                f.tiempo = a+' hrs hábiles'
                                                            }
                                                        }
                                                        f.color = '#43b535'
                                                    }
                                                }
                                                actualizarInterno(f)
                                            }
                                        }
                                    })
                                    return res.status(200).send({solicitudes:solicitudes})
                                }                          
                            })
                        })
                    })
                    })
                })
            })
        }
    })
}
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];
        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function getSolicitudesResumen(req,res){
    Solicitud.find({}).sort({numero:-1}).exec((err,solicitudes)=>{
        if(!solicitudes[0]) return res.status(404).send({message:'no hya solicitudes ingresadas'})
        if(solicitudes[0]) {
            TipoSolicitud.populate(solicitudes,{path:'solicitud'},(err,solicitudes)=>{
                Area.populate(solicitudes,{path:'solicitud.area'},(err,solicitudes)=>{
                    Administrador.populate(solicitudes,{path:'usuario'},(err,solicitudes)=>{
                    // https://apis.digital.gob.cl/fl/feriados
                        var year = new Date().getFullYear()
                        http.get('https://apis.digital.gob.cl/fl/feriados/'+year, (resp) => {
                            let data = '';
                            resp.on('data', (chunk) => {
                            data += chunk;
                            });
                            resp.on('end', () => {
                                if(JSON.parse(data) != undefined){
                                    var feriados = []
                                    JSON.parse(data).forEach(f=>{
                                        feriados.push(f.fecha)
                                    })
                                    solicitudes.forEach(f=>{
                                        if(f.estado == 'Recepcionado'){
                                            var hoy = new Date();
                                            var dianohabil = []  
                                            var diferencia = hoy - new Date(f.create_at);
                                            var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                            var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                            var c = Math.floor((((diferencia/1000) / 60)));
                                            var inicial = new Date(f.create_at);
                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            while(inicial < hoy){
                                                if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                    dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                }
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            }
                                            var fechasoli = new Date(f.create_at).getFullYear()+'-'+(String(new Date(f.create_at).getMonth()+1).length == 1 ? '0'+(new Date(f.create_at).getMonth()+1) : new Date(f.create_at).getMonth()+1)+'-'+new Date(f.create_at).getDate()
                                            var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                            feriados.forEach(fe=>{
                                                if(fe>= fechasoli && fe <= hoyparse){
                                                    dianohabil.push({fecha:fe})
                                                }
                                            })
                                            dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                            a = a - (dianohabil.length * 24)
                                            b = b - (dianohabil.length)
                                            if(a>=120){
                                                f.tiempo = '+'+b+' días hábiles'
                                                f.color = '#c30c0c'
                                            }else{
                                                if(a<120 && a>=72){
                                                    f.color = '#ceb822'
                                                    f.tiempo = '+'+b+' días hábiles'
                                                }else{
                                                    if(a<72 && a>=48){
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a < 1){
                                                            f.tiempo = c+' minutos hábiles'
                                                        }else{
                                                            f.tiempo = a+' hrs hábiles'
                                                        }
                                                    }
                                                    f.color = '#43b535'
                                                }                                      
                                            }
                                            actualizarInterno(f)
                                        }else{
                                            if(f.estado == 'En proceso'){
                                                var hoy = new Date();
                                                var dianohabil = [] 
                                                var diferencia = hoy - new Date(f.fechaEnProceso);
                                                var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                var c = Math.floor((((diferencia/1000) / 60)));
                                                var inicial = new Date(f.fechaEnProceso);
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                while(inicial < hoy){
                                                    if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                        dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                    }
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                }
                                                var fechasoli = new Date(f.fechaEnProceso).getFullYear()+'-'+(String(new Date(f.fechaEnProceso).getMonth()+1).length == 1 ? '0'+(new Date(f.fechaEnProceso).getMonth()+1) : new Date(f.fechaEnProceso).getMonth()+1)+'-'+new Date(f.fechaEnProceso).getDate()
                                                var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                                feriados.forEach(fe=>{
                                                    if(fe>= fechasoli && fe <= hoyparse){
                                                        dianohabil.push({fecha:fe})
                                                    }
                                                })
                                                dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                                a = a - (dianohabil.length * 24)
                                                b = b - (dianohabil.length)
                                                if(a>=120){
                                                    f.tiempo = '+'+b+' días hábiles'
                                                    f.color = '#c30c0c'
                                                }else{
                                                    if(a<120 && a>=72){
                                                        f.color = '#ceb822'
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a<72 && a>=48){
                                                            f.tiempo = '+'+b+' días hábiles'
                                                        }else{
                                                            if(a < 1){
                                                                f.tiempo = c+' minutos hábiles'
                                                            }else{
                                                                f.tiempo = a+' hrs hábiles'
                                                            }
                                                        }
                                                        f.color = '#43b535'
                                                    }
                                                }
                                                actualizarInterno(f)
                                            }
                                        }
                                    })
                                    solicitudes = sortJSON(solicitudes,'area','asc')
                                    var final = []
                                    var temp = solicitudes[0].area
                                    var contador = 0;
                                    final.push({area:solicitudes[0].solicitud.area.nombre,contador:0,recepcionado:{total:0,inicio:0,intermedio:0,final:0},
                                    proceso:{total:0,inicio:0,intermedio:0,final:0},finalizadoResuelto:{total:0,inicio:0,intermedio:0,final:0},finalizadoSinSolucion:{total:0,inicio:0,intermedio:0,final:0}})
                                    solicitudes.forEach((s,i)=>{
                                        if(String(s.area) == String(temp)){
                                            final[contador].contador++;
                                            if(s.estado == 'Recepcionado'){
                                                final[contador].recepcionado.total++;
                                                final[contador].recepcionado.inicio = (s.color == '#43b535') ? final[contador].recepcionado.inicio  + 1 : final[contador].recepcionado.inicio;
                                                final[contador].recepcionado.intermedio = (s.color == '#ceb822') ? final[contador].recepcionado.intermedio  + 1 : final[contador].recepcionado.intermedio;
                                                final[contador].recepcionado.final = (s.color == '#c30c0c') ? final[contador].recepcionado.final  + 1 : final[contador].recepcionado.final;
                                            }
                                            if(s.estado == 'En proceso'){
                                                final[contador].proceso.total++;
                                                final[contador].proceso.inicio = (s.color == '#43b535') ? final[contador].proceso.inicio  + 1 : final[contador].proceso.inicio;
                                                final[contador].proceso.intermedio = (s.color == '#ceb822') ? final[contador].proceso.intermedio  + 1 : final[contador].proceso.intermedio;
                                                final[contador].proceso.final = (s.color == '#c30c0c') ? final[contador].proceso.final  + 1 : final[contador].proceso.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento resuelto'){
                                                final[contador].finalizadoResuelto.total++;
                                                final[contador].finalizadoResuelto.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoResuelto.inicio  + 1 : final[contador].finalizadoResuelto.inicio;
                                                final[contador].finalizadoResuelto.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoResuelto.intermedio  + 1 : final[contador].finalizadoResuelto.intermedio;
                                                final[contador].finalizadoResuelto.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoResuelto.final  + 1 : final[contador].finalizadoResuelto.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento sin solución'){
                                                final[contador].finalizadoSinSolucion.total++;
                                                final[contador].finalizadoSinSolucion.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoSinSolucion.inicio  + 1 : final[contador].finalizadoSinSolucion.inicio;
                                                final[contador].finalizadoSinSolucion.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoSinSolucion.intermedio  + 1 : final[contador].finalizadoSinSolucion.intermedio;
                                                final[contador].finalizadoSinSolucion.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoSinSolucion.final  + 1 : final[contador].finalizadoSinSolucion.final;
                                            }
                                        }else{
                                            contador++;
                                            temp = s.area;
                                            final.push({area:s.solicitud.area.nombre,contador:0,recepcionado:{total:0,inicio:0,intermedio:0,final:0},
                                            proceso:{total:0,inicio:0,intermedio:0,final:0},finalizadoResuelto:{total:0,inicio:0,intermedio:0,final:0},finalizadoSinSolucion:{total:0,inicio:0,intermedio:0,final:0}})
                                            final[contador].contador++;
                                            if(s.estado == 'Recepcionado'){
                                                final[contador].recepcionado.total++;
                                                final[contador].recepcionado.inicio = (s.color == '#43b535') ? final[contador].recepcionado.inicio  + 1 : final[contador].recepcionado.inicio;
                                                final[contador].recepcionado.intermedio = (s.color == '#ceb822') ? final[contador].recepcionado.intermedio  + 1 : final[contador].recepcionado.intermedio;
                                                final[contador].recepcionado.final = (s.color == '#c30c0c') ? final[contador].recepcionado.final  + 1 : final[contador].recepcionado.final;
                                            }
                                            if(s.estado == 'En proceso'){
                                                final[contador].proceso.total++;
                                                final[contador].proceso.inicio = (s.color == '#43b535') ? final[contador].proceso.inicio  + 1 : final[contador].proceso.inicio;
                                                final[contador].proceso.intermedio = (s.color == '#ceb822') ? final[contador].proceso.intermedio  + 1 : final[contador].proceso.intermedio;
                                                final[contador].proceso.final = (s.color == '#c30c0c') ? final[contador].proceso.final  + 1 : final[contador].proceso.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento resuelto'){
                                                final[contador].finalizadoResuelto.total++;
                                                final[contador].finalizadoResuelto.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoResuelto.inicio  + 1 : final[contador].finalizadoResuelto.inicio;
                                                final[contador].finalizadoResuelto.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoResuelto.intermedio  + 1 : final[contador].finalizadoResuelto.intermedio;
                                                final[contador].finalizadoResuelto.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoResuelto.final  + 1 : final[contador].finalizadoResuelto.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento sin solución'){
                                                final[contador].finalizadoSinSolucion.total++;
                                                final[contador].finalizadoSinSolucion.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoSinSolucion.inicio  + 1 : final[contador].finalizadoSinSolucion.inicio;
                                                final[contador].finalizadoSinSolucion.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoSinSolucion.intermedio  + 1 : final[contador].finalizadoSinSolucion.intermedio;
                                                final[contador].finalizadoSinSolucion.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoSinSolucion.final  + 1 : final[contador].finalizadoSinSolucion.final;
                                            }
                                        }
                                    })
                                    return res.status(200).send({final:final,solicitudes:solicitudes})
                                }else{
                                    solicitudes.forEach(f=>{
                                        if(f.estado == 'Recepcionado'){
                                            var hoy = new Date();
                                            var dianohabil = []  
                                            var diferencia = hoy - new Date(f.create_at);
                                            var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                            var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                            var c = Math.floor((((diferencia/1000) / 60)));
                                            var inicial = new Date(f.create_at);
                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            while(inicial < hoy){
                                                if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                    dianohabil.push(inicial)
                                                }
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                            }
                                            a = a - (dianohabil.length * 24)
                                            b = b - (dianohabil.length)
                                            if(a>=120){
                                                f.tiempo = '+'+b+' días habiles'
                                                f.color = '#c30c0c'
                                            }else{
                                                if(a<120 && a>=72){
                                                    f.color = '#ceb822'
                                                    f.tiempo = '+'+b+' días habiles'
                                                }else{
                                                    if(a<72 && a>=48){
                                                        f.tiempo = '+'+b+' días habiles'
                                                    }else{
                                                        if(a < 1){
                                                            f.tiempo = c+' minutos hábiles'
                                                        }else{
                                                            f.tiempo = a+' hrs hábiles'
                                                        }
                                                    }
                                                    f.color = '#43b535'
                                                }
                                                actualizarInterno(f)
                                            }
                                        }else{
                                            if(f.estado == 'En proceso'){
                                                var hoy = new Date();
                                                var dianohabil = [] 
                                                var diferencia = hoy - new Date(f.fechaEnProceso);
                                                var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                var c = Math.floor((((diferencia/1000) / 60)));
                                                var inicial = new Date(f.fechaEnProceso);
                                                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                while(inicial < hoy){
                                                    if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                        dianohabil.push(inicial)
                                                    }
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                }
                                                a = a - (dianohabil.length * 24)
                                                b = b - (dianohabil.length)
                                                if(a>=120){
                                                    f.tiempo = '+'+b+' días habiles'
                                                    f.color = '#c30c0c'
                                                }else{
                                                    if(a<120 && a>=72){
                                                        f.color = '#ceb822'
                                                        f.tiempo = '+'+b+' días hábiles'
                                                    }else{
                                                        if(a<72 && a>=48){
                                                            f.tiempo = '+'+b+' días hábiles'
                                                        }else{
                                                            if(a < 1){
                                                                f.tiempo = c+' minutos hábiles'
                                                            }else{
                                                                f.tiempo = a+' hrs hábiles'
                                                            }
                                                        }
                                                        f.color = '#43b535'
                                                    }
                                                }
                                                actualizarInterno(f)
                                            }
                                        }
                                    })
                                    solicitudes = sortJSON(solicitudes,'area','asc')
                                    var final = []
                                    var temp = solicitudes[0].area
                                    var contador = 0;
                                    final.push({area:solicitudes[0].solicitud.area.nombre,contador:0,recepcionado:{total:0,inicio:0,intermedio:0,final:0},
                                    proceso:{total:0,inicio:0,intermedio:0,final:0},finalizadoResuelto:{total:0,inicio:0,intermedio:0,final:0},finalizadoSinSolucion:{total:0,inicio:0,intermedio:0,final:0}})
                                    solicitudes.forEach((s,i)=>{
                                        if(String(s.area) == String(temp)){
                                            final[contador].contador++;
                                            if(s.estado == 'Recepcionado'){
                                                final[contador].recepcionado.total++;
                                                final[contador].recepcionado.inicio = (s.color == '#43b535') ? final[contador].recepcionado.inicio  + 1 : final[contador].recepcionado.inicio;
                                                final[contador].recepcionado.intermedio = (s.color == '#ceb822') ? final[contador].recepcionado.intermedio  + 1 : final[contador].recepcionado.intermedio;
                                                final[contador].recepcionado.final = (s.color == '#c30c0c') ? final[contador].recepcionado.final  + 1 : final[contador].recepcionado.final;
                                            }
                                            if(s.estado == 'En proceso'){
                                                final[contador].proceso.total++;
                                                final[contador].proceso.inicio = (s.color == '#43b535') ? final[contador].proceso.inicio  + 1 : final[contador].proceso.inicio;
                                                final[contador].proceso.intermedio = (s.color == '#ceb822') ? final[contador].proceso.intermedio  + 1 : final[contador].proceso.intermedio;
                                                final[contador].proceso.final = (s.color == '#c30c0c') ? final[contador].proceso.final  + 1 : final[contador].proceso.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento resuelto'){
                                                final[contador].finalizadoResuelto.total++;
                                                final[contador].finalizadoResuelto.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoResuelto.inicio  + 1 : final[contador].finalizadoResuelto.inicio;
                                                final[contador].finalizadoResuelto.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoResuelto.intermedio  + 1 : final[contador].finalizadoResuelto.intermedio;
                                                final[contador].finalizadoResuelto.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoResuelto.final  + 1 : final[contador].finalizadoResuelto.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento sin solución'){
                                                final[contador].finalizadoSinSolucion.total++;
                                                final[contador].finalizadoSinSolucion.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoSinSolucion.inicio  + 1 : final[contador].finalizadoSinSolucion.inicio;
                                                final[contador].finalizadoSinSolucion.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoSinSolucion.intermedio  + 1 : final[contador].finalizadoSinSolucion.intermedio;
                                                final[contador].finalizadoSinSolucion.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoSinSolucion.final  + 1 : final[contador].finalizadoSinSolucion.final;
                                            }
                                        }else{
                                            contador++;
                                            temp = s.area;
                                            final.push({area:s.solicitud.area.nombre,contador:0,recepcionado:{total:0,inicio:0,intermedio:0,final:0},
                                            proceso:{total:0,inicio:0,intermedio:0,final:0},finalizadoResuelto:{total:0,inicio:0,intermedio:0,final:0},finalizadoSinSolucion:{total:0,inicio:0,intermedio:0,final:0}})
                                            final[contador].contador++;
                                            if(s.estado == 'Recepcionado'){
                                                final[contador].recepcionado.total++;
                                                final[contador].recepcionado.inicio = (s.color == '#43b535') ? final[contador].recepcionado.inicio  + 1 : final[contador].recepcionado.inicio;
                                                final[contador].recepcionado.intermedio = (s.color == '#ceb822') ? final[contador].recepcionado.intermedio  + 1 : final[contador].recepcionado.intermedio;
                                                final[contador].recepcionado.final = (s.color == '#c30c0c') ? final[contador].recepcionado.final  + 1 : final[contador].recepcionado.final;
                                            }
                                            if(s.estado == 'En proceso'){
                                                final[contador].proceso.total++;
                                                final[contador].proceso.inicio = (s.color == '#43b535') ? final[contador].proceso.inicio  + 1 : final[contador].proceso.inicio;
                                                final[contador].proceso.intermedio = (s.color == '#ceb822') ? final[contador].proceso.intermedio  + 1 : final[contador].proceso.intermedio;
                                                final[contador].proceso.final = (s.color == '#c30c0c') ? final[contador].proceso.final  + 1 : final[contador].proceso.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento resuelto'){
                                                final[contador].finalizadoResuelto.total++;
                                                final[contador].finalizadoResuelto.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoResuelto.inicio  + 1 : final[contador].finalizadoResuelto.inicio;
                                                final[contador].finalizadoResuelto.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoResuelto.intermedio  + 1 : final[contador].finalizadoResuelto.intermedio;
                                                final[contador].finalizadoResuelto.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoResuelto.final  + 1 : final[contador].finalizadoResuelto.final;
                                            }
                                            if(s.estado == 'Finalizado por requerimiento sin solución'){
                                                final[contador].finalizadoSinSolucion.total++;
                                                final[contador].finalizadoSinSolucion.inicio = (s.colorFin == '#43b535') ? final[contador].finalizadoSinSolucion.inicio  + 1 : final[contador].finalizadoSinSolucion.inicio;
                                                final[contador].finalizadoSinSolucion.intermedio = (s.colorFin == '#ceb822') ? final[contador].finalizadoSinSolucion.intermedio  + 1 : final[contador].finalizadoSinSolucion.intermedio;
                                                final[contador].finalizadoSinSolucion.final = (s.colorFin == '#c30c0c') ? final[contador].finalizadoSinSolucion.final  + 1 : final[contador].finalizadoSinSolucion.final;
                                            }
                                        }
                                    })
                                    return res.status(200).send({final:final,solicitudes:solicitudes})
                                }                          
                            })
                        })
                    })
                })
            })
        }
    })
}

function actualizarInterno(data){
    // console.log(data)
    Solicitud.updateOne({_id:data._id},{$set:{
        tiempo:data.tiempo,
        color:data.color,
        // area:data.solicitud.area._id
    }}).exec((err,act)=>{})
}

function changeProceso(req,res){
    Solicitud.findOne({_id:req.body._id,estado:'Recepcionado'}).exec((err,enviado)=>{
        if(!enviado) return res.status(404).send({message:'la solicitud ya no esta en estado enviado',noenviado:true})
        if(enviado){
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
                    from: '"Gestor de Solicitudes" <soporte.formulario@gmail.com>', // sender address
                    to: null, // list of receivers
                    subject: 'Solicitud #'+enviado.numero+' En proceso', // Subject line
                    text: "Se ha actualizado la solicitud a 'En proceso'", // plain text body
                    html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Solicitud #'+enviado.numero+' En proceso</div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:justify;">La solicitud ha pasado a estar En proceso con el siguiente mensaje desde el área encargada<div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left;pointer-events: none; cursor: default; text-decoration: none; color: black;">Respuesta: <span style="font-weight:initial;">'+req.body.respuestaProceso+'</span></div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Para cualquier consulta contáctese a soporte.formulario@gmail.com</div></div></div></div>',
                    attachments: [                                            
                    {   // file on disk as an attachment
                        filename: 'ok.png',
                        path: __dirname+'/../../img/ok.png', // stream this file,
                        cid: 'correcto',
                    }],
                };
                var emails = [enviado.email]
                async.each(emails, (to, callback)=>{
                    mailOptions.to = to;
                    transporter.sendMail(mailOptions,  (err)=> {
                        if (err) { 
                            callback(err);
                        } else { 
                            callback();
                        }
                    });
                }, function(err){
                    return  res.status(404).send({ message:'No se ha podido enviar los correos',err });
                });
                Solicitud.updateOne({_id:req.body._id},{$set:{respuestaProceso:req.body.respuestaProceso,fechaEnProceso:new Date(),usuario:req.user.sub,estado:'En proceso'}}).exec((err,act)=>{
                    if(act.nModified > 0){
                        io.emit('recargar',{recargar:true})
                        return res.status(200).send({message:'se ha actualizado la solicitud'})
                    }else{
                        return res.status(404).send({message:'no se pudo actualizar la solicitud'})
                    }
                })         
            });
        }
    })
}

function finalizarRequerimiento(req,res){
    Solicitud.findOne({_id:req.body._id,estado:'En proceso'}).exec((err,enviado)=>{
        if(!enviado) return res.status(404).send({message:'la solicitud ya no esta en estado en proceso',noenproceso:true})
        if(enviado){
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
                    from: '"Gestor de Solicitudes" <soporte.formulario@gmail.com>', // sender address
                    to: null, // list of receivers
                    subject: 'Solicitud #'+enviado.numero+' finalizado', // Subject line
                    text: "Se ha actualizado la solicitud a '"+req.body.estado+"'", // plain text body
                    html: '<header><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></header><div style="text-align:center;"><div style="padding:40px 20px 36px 20px" align="center" class="m_3686452009713813715mdv2rw"><img src="cid:correcto" style="width:90px;height:25%;margin-bottom:16px" class="CToWUd"><div style="font-family:"><div style="font-size:24px">Solicitud #'+enviado.numero+' '+req.body.estado+' </div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:justify;">El requerimiento ha sido finalizado con siguiente mensaje desde el área encargada<div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left;pointer-events: none; cursor: default; text-decoration: none; color: black;">Respuesta: <span style="font-weight:initial;">'+req.body.respuestaFinalizado+'</span></div><div style="padding-top:32px;text-align:center"></div><br><div style="font-size:12px;line-height:16px;color:rgba(0,0,0,0.54);letter-spacing:0.3px">Para cualquier consulta contáctese a soporte.formulario@gmail.com</div></div></div></div>',
                    attachments: [                                            
                    {   // file on disk as an attachment
                        filename: req.body.estado == "Finalizado por requerimiento resuelto" ? 'ok.png' : 'err.png',
                        path: req.body.estado == "Finalizado por requerimiento resuelto" ? __dirname+'/../../img/ok.png' : __dirname+'/../../img/err.png' , // stream this file,
                        cid: 'correcto',
                    }],
                };
                var emails = [enviado.email]
                async.each(emails, (to, callback)=>{
                    mailOptions.to = to;
                    transporter.sendMail(mailOptions,  (err)=> {
                        if (err) { 
                            callback(err);
                        } else { 
                            callback();
                        }
                    });
                }, function(err){
                    return  res.status(404).send({ message:'No se ha podido enviar los correos',err });
                });
                var hoy = new Date();
                var diferencia = hoy - new Date(enviado.fechaEnProceso);
                var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                var c = Math.floor((((diferencia/1000) / 60)));
                var inicial = new Date(enviado.fechaEnProceso);
                inicial = new Date(inicial.setDate(inicial.getDate()+1))
                var dianohabil = []
                while(inicial < hoy){
                    if(inicial.getDay() == 0 || inicial.getDay() == 6){
                        dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                    }
                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                }
                var fechasoli = new Date(enviado.fechaEnProceso).getFullYear()+'-'+(String(new Date(enviado.fechaEnProceso).getMonth()+1).length == 1 ? '0'+(new Date(enviado.fechaEnProceso).getMonth()+1) : new Date(enviado.fechaEnProceso).getMonth()+1)+'-'+new Date(enviado.fechaEnProceso).getDate()
                var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                var year = new Date().getFullYear()
                http.get('https://apis.digital.gob.cl/fl/feriados/'+year, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                    data += chunk;
                    });
                    resp.on('end', () => {
                        if(JSON.parse(data) != undefined){
                            var feriados = []
                            JSON.parse(data).forEach(f=>{
                                feriados.push(f.fecha)
                            })
                            feriados.forEach(fe=>{
                                if(fe>= fechasoli && fe <= hoyparse){
                                    dianohabil.push({fecha:fe})
                                }
                            })
                            var tiempo = ''
                            var color = '';
                            var colorFin = ''
                            dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                            a = a - (dianohabil.length * 24)
                            b = b - (dianohabil.length)
                            if(a>=120){
                                tiempo = 'Demoró +'+b+' días hábiles'
                            }else{
                                if(a<120 && a>=24){
                                    tiempo = 'Demoró +'+b+' días hábiles'
                                }else{
                                    if(a < 1){
                                        tiempo = 'Demoró +'+c+' minutos hábiles'
                                    }else{
                                        tiempo = 'Demoró +'+a+' hrs hábiles'
                                    }
                                }
                            }
                            if(a>=120){
                                colorFin = '#c30c0c'
                            }else{
                                if(a<120 && a>=72){
                                    colorFin = '#ceb822'
                                }else{
                                    
                                    colorFin = '#43b535'
                                }
                            }
                            color = req.body.estado == 'Finalizado por requerimiento resuelto' ? '#427be8' : '#93b0e8'
                            Solicitud.updateOne({_id:req.body._id},{$set:{respuestaFinalizado:req.body.respuestaFinalizado,fechaCierre:new Date(),usuarioCierre:req.user.sub,estado:req.body.estado,tiempo:tiempo,color:color,colorFin:colorFin}}).exec((err,act)=>{
                                if(act.nModified > 0){
                                    io.emit('recargar',{recargar:true})
                                    return res.status(200).send({message:'se ha actualizado la solicitud'})
                                }else{
                                    return res.status(404).send({message:'no se pudo actualizar la solicitud'})
                                }
                            })  
                        }else{
                            var tiempo = ''
                            var color = '';
                            var colorFin = '';
                            dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                            a = a - (dianohabil.length * 24)
                            b = b - (dianohabil.length)
                            if(a>=120){
                                tiempo = 'Demoró +'+b+' días hábiles'
                            }else{
                                if(a<120 && a>=24){
                                    tiempo = 'Demoró +'+b+' días hábiles'
                                }else{
                                    if(a < 1){
                                        tiempo = 'Demoró +'+c+' minutos hábiles'
                                    }else{
                                        tiempo = 'Demoró +'+a+' hrs hábiles'
                                    }
                                }
                            }
                            if(a>=120){
                                colorFin = '#c30c0c'
                            }else{
                                if(a<120 && a>=72){
                                    colorFin = '#ceb822'
                                }else{
                                    
                                    colorFin = '#43b535'
                                }
                            }
                            color = req.body.estado == 'Finalizado por requerimiento resuelto' ? '#427be8' : '#93b0e8'
                            Solicitud.updateOne({_id:req.body._id},{$set:{respuestaFinalizado:req.body.respuestaFinalizado,fechaCierre:new Date(),usuarioCierre:req.user.sub,estado:req.body.estado,tiempo:tiempo,color:color,colorFin:colorFin}}).exec((err,act)=>{
                                if(act.nModified > 0){
                                    io.emit('recargar',{recargar:true})
                                    return res.status(200).send({message:'se ha finalizado la solicitud'})
                                }else{
                                    return res.status(404).send({message:'no se pudo finalizar la solicitud'})
                                }
                            })  
                        }
                    })
                })
                       
            });
        }
    })
}

function getSolicitudesArea(req,res){
    TipoSolicitud.find({area:req.params.id}).exec((err,area)=>{
        var tipos = []
        area.forEach(a=>{
            tipos.push(a._id)
        })
        Solicitud.find({solicitud:{$in:tipos}}).sort({numero:-1}).exec((err,solicitudes)=>{
            if(!solicitudes[0]) return res.status(404).send({message:'no hya solicitudes ingresadas'})
            if(solicitudes[0]) {
                TipoSolicitud.populate(solicitudes,{path:'solicitud'},(err,solicitudes)=>{
                    Area.populate(solicitudes,{path:'solicitud.area'},(err,solicitudes)=>{
                        Administrador.populate(solicitudes,{path:'usuario'},(err,solicitudes)=>{
                            Administrador.populate(solicitudes,{path:'usuarioCierre'},(err,solicitudes)=>{
                                var year = new Date().getFullYear()
                                http.get('https://apis.digital.gob.cl/fl/feriados/'+year, (resp) => {
                                    let data = '';
                                    resp.on('data', (chunk) => {
                                    data += chunk;
                                    });
                                    resp.on('end', () => {
                                        if(JSON.parse(data) != undefined){
                                            var feriados = []
                                            JSON.parse(data).forEach(f=>{
                                                feriados.push(f.fecha)
                                            })
                                            solicitudes.forEach(f=>{
                                                if(f.estado == 'Recepcionado'){
                                                    var hoy = new Date();
                                                    var dianohabil = []  
                                                    var diferencia = hoy - new Date(f.create_at);
                                                    var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                    var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                    var c = Math.floor((((diferencia/1000) / 60)));
                                                    var inicial = new Date(f.create_at);
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                    while(inicial < hoy){
                                                        if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                            dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                        }
                                                        inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                    }
                                                    var fechasoli = new Date(f.create_at).getFullYear()+'-'+(String(new Date(f.create_at).getMonth()+1).length == 1 ? '0'+(new Date(f.create_at).getMonth()+1) : new Date(f.create_at).getMonth()+1)+'-'+new Date(f.create_at).getDate()
                                                    var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                                    feriados.forEach(fe=>{
                                                        if(fe>= fechasoli && fe <= hoyparse){
                                                            dianohabil.push({fecha:fe})
                                                        }
                                                    })
                                                    dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                                    a = a - (dianohabil.length * 24)
                                                    b = b - (dianohabil.length)
                                                    if(a>=120){
                                                        f.tiempo = '+'+b+' días hábiles'
                                                        f.color = '#c30c0c'
                                                    }else{
                                                        if(a<120 && a>=72){
                                                            f.color = '#ceb822'
                                                            f.tiempo = '+'+b+' días hábiles'
                                                        }else{
                                                            if(a<72 && a>=24){
                                                                f.tiempo = '+'+b+' días hábiles'
                                                            }else{
                                                                if(a < 1){
                                                                    f.tiempo = c+' minutos hábiles'
                                                                }else{
                                                                    f.tiempo = a+' hrs hábiles'
                                                                }
                                                            }
                                                            f.color = '#43b535'
                                                        }                                      
                                                    }
                                                    actualizarInterno(f)
                                                }else{
                                                    if(f.estado == 'En proceso'){
                                                        var hoy = new Date();
                                                        var dianohabil = [] 
                                                        var diferencia = hoy - new Date(f.fechaEnProceso);
                                                        var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                        var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                        var c = Math.floor((((diferencia/1000) / 60)));
                                                        var inicial = new Date(f.fechaEnProceso);
                                                        inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                        while(inicial < hoy){
                                                            if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                                dianohabil.push({fecha:inicial.getFullYear()+'-'+(String(inicial.getMonth()+1).length == 1 ? '0'+(inicial.getMonth()+1) : inicial.getMonth()+1)+'-'+inicial.getDate()})
                                                            }
                                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                        }
                                                        var fechasoli = new Date(f.fechaEnProceso).getFullYear()+'-'+(String(new Date(f.fechaEnProceso).getMonth()+1).length == 1 ? '0'+(new Date(f.fechaEnProceso).getMonth()+1) : new Date(f.fechaEnProceso).getMonth()+1)+'-'+new Date(f.fechaEnProceso).getDate()
                                                        var hoyparse = hoy.getFullYear()+'-'+(String(hoy.getMonth()+1).length == 1 ? '0'+(hoy.getMonth()+1) : hoy.getMonth()+1)+'-'+hoy.getDate()
                                                        feriados.forEach(fe=>{
                                                            if(fe>= fechasoli && fe <= hoyparse){
                                                                dianohabil.push({fecha:fe})
                                                            }
                                                        })
                                                        dianohabil = eliminarObjetosDuplicados(dianohabil,'fecha')
                                                        a = a - (dianohabil.length * 24)
                                                        b = b - (dianohabil.length)
                                                        if(a>=120){
                                                            f.tiempo = '+'+b+' días hábiles'
                                                            f.color = '#c30c0c'
                                                        }else{
                                                            if(a<120 && a>=24){
                                                                f.color = '#ceb822'
                                                                f.tiempo = '+'+b+' días hábiles'
                                                            }else{
                                                                if(a < 1){
                                                                    f.tiempo = c+' minutos hábiles'
                                                                }else{
                                                                    f.tiempo = a+' hrs hábiles'
                                                                }
                                                                f.color = '#43b535'
                                                            }
                                                        }
                                                        actualizarInterno(f)
                                                    }
                                                }
                                            })
                                            return res.status(200).send({solicitudes:solicitudes})
                                        }else{
                                            solicitudes.forEach(f=>{
                                                if(f.estado == 'Recepcionado'){
                                                    var hoy = new Date();
                                                    var dianohabil = []  
                                                    var diferencia = hoy - new Date(f.create_at);
                                                    var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                    var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                    var c = Math.floor((((diferencia/1000) / 60)));
                                                    var inicial = new Date(f.create_at);
                                                    inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                    while(inicial < hoy){
                                                        if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                            dianohabil.push(inicial)
                                                        }
                                                        inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                    }
                                                    a = a - (dianohabil.length * 24)
                                                    b = b - (dianohabil.length)
                                                    if(a>=120){
                                                        f.tiempo = '+'+b+' días habiles'
                                                        f.color = '#c30c0c'
                                                    }else{
                                                        if(a<120 && a>=72){
                                                            f.color = '#ceb822'
                                                            f.tiempo = '+'+b+' días habiles'
                                                        }else{
                                                            if(a<72 && a>=24){
                                                                f.tiempo = '+'+b+' días habiles'
                                                            }else{
                                                                if(a < 1){
                                                                    f.tiempo = c+' minutos hábiles'
                                                                }else{
                                                                    f.tiempo = a+' hrs hábiles'
                                                                }
                                                            }
                                                            f.color = '#43b535'
                                                        }
                                                        actualizarInterno(f)
                                                    }
                                                }else{
                                                    if(f.estado == 'En proceso'){
                                                        var hoy = new Date();
                                                        var dianohabil = [] 
                                                        var diferencia = hoy - new Date(f.fechaEnProceso);
                                                        var a = Math.floor((((diferencia/1000) / 60 / 60 )));
                                                        var b = Math.floor((((diferencia/1000) / 60 / 60 / 24)));
                                                        var c = Math.floor((((diferencia/1000) / 60)));
                                                        var inicial = new Date(f.fechaEnProceso);
                                                        inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                        while(inicial < hoy){
                                                            if(inicial.getDay() == 0 || inicial.getDay() == 6){
                                                                dianohabil.push(inicial)
                                                            }
                                                            inicial = new Date(inicial.setDate(inicial.getDate()+1))
                                                        }
                                                        a = a - (dianohabil.length * 24)
                                                        b = b - (dianohabil.length)
                                                        if(a>=120){
                                                            f.tiempo = '+'+b+' días habiles'
                                                            f.color = '#c30c0c'
                                                        }else{
                                                            if(a<120 && a>=24){
                                                                f.color = '#ceb822'
                                                                f.tiempo = '+'+b+' días habiles'
                                                            }else{
                                                                if(a < 1){
                                                                    f.tiempo = c+' minutos hábiles'
                                                                }else{
                                                                    f.tiempo = a+' hrs hábiles'
                                                                }
                                                                f.color = '#43b535'
                                                            }
                                                        }
                                                        actualizarInterno(f)
                                                    }
                                                }
                                            })
                                            return res.status(200).send({solicitudes:solicitudes})
                                        }                          
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    })
    
}


 



module.exports = {
    saveSolicitud,
    getSolicitudes,
    getSolicitudesArea,
    changeProceso,
    finalizarRequerimiento,
    getSolicitudesResumen
}