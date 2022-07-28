'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var verificador = function(rut) {
    var Rut = [];
    if (rut.length == 9) {
        rut = "0" + rut;
    }
    rut = rut.toLowerCase();
    for (let i = 0; i < 10; i++) {
        Rut[i] = rut.charAt(i);
    }
    var r = new RegExp(/[0-9]/g);
    var prueba, cantidad = 0;
    for (let i = 0; i < 8; i++) {
        if ((prueba = Rut[i].replace(r, '')) == '') {
            // console.log("es numero")
            cantidad = cantidad;
        } else {
            cantidad = cantidad + 1;
        }
    }
    if (cantidad == 0) {
        //solo son numeros, por tanto, puede seguir con la validación
        var suma = 0,
            mul = 2;
        for (let i = 7; i > -1; i--) {
            suma = suma + (Number(Rut[i]) * mul);
            if (mul == 7) {
                mul = 2;
            } else {
                mul++;
            }
        }
        var resul = suma % 11;
        resul = 11 - resul;
        var digito;
        if (resul == 11) {
            digito = 0;
        } else {
            if (resul == 10) {
                digito = "k"
            } else {
                digito = resul;
            }
        }
        if (digito == Rut[9]) {
            //El rut es correcto
            return true;
        } else {
            //Rut INCORRECTO
            return false;
        }
    } else {
        //Hay una caracter que no es un numero en el cuerpo del rut antes del digito verificador
        return false;
    }
}

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var SolicitudSchema = Schema({
    numero:Number,
    nombre: {
        type: String,
        lowercase: true,
        trim: true,
        min: 2,
        required: [true, 'Nombre es requerido'],
    },
    rut: {
        type: String,
        trim: true,
        min: 9,
        max: 10,
        validate: [verificador, 'Favor de Ingresar un Rut Valido'],
        required: [true, 'rut es requerido']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        min: 5,
        max: 60,
        validate: [validateEmail, 'Favor de Ingresar un Email Valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Favor de Ingresar un Email Valido'],
        required: [true, 'email es requerido'],
    },
    create_at: {
        type: Date,
    },
    estado:{
        type:String,
        default:'Recepcionado'
    },
    fechaModificacion: {
        type:Date,
      },
    fechaEnProceso: {
        type:Date,
    },
    fechaCierre: {
        type:Date,
    },
    telefono: {
        type: String,
        min: 11,
        max: 12,
    },
    tiempo:Number,
    direccion:String,
    lat:Number,
    lng:Number,
    solicitud:{
        type: Schema.ObjectId,
        ref: 'tipoSolicitud',
    },
    area:{
        type: Schema.ObjectId,
        ref: 'Area',
    },
    requerimiento:String,
    usuario:{
        type: Schema.ObjectId,
        ref: 'Administrador',
    },
    usuarioCierre:{
        type: Schema.ObjectId,
        ref: 'Administrador',
    },
    tiempo:{
        type:String,
        default:'0'
    },
    color:{
        type:String,
        default:'#cee239c7'
    },
    colorFin:String,
    respuestaProceso:String,
    respuestaFinalizado:String

});
module.exports = mongoose.model('Solicitud', SolicitudSchema);