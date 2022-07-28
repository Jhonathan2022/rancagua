'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoSolicitudSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido'],
    },
    create_at:Date,
    area:{
        type: Schema.ObjectId,
        ref: 'Area',
    },
    activo:{
        type:Boolean,
        default:true
    },
    fechaModificacion:Date,
    solicitudes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('tipoSolicitud', tipoSolicitudSchema);