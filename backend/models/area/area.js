'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreaSchema = Schema({
    nombre: {
        type: String,
        lowercase: true,
        required: [true, 'Nombre es requerido'],
    },
    create_at:Date,
    email:String,
    solicitudes:{
        type:Number,
        default:0
    }
    
})

module.exports = mongoose.model('Area', AreaSchema);