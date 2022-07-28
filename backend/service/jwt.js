'use strict'

var jwt = require('jsonwebtoken');
var moment = require('moment');

var secret='contrasena_21-CConsut4__wunicip4L_oalgo__asií';

exports.createToken = function(user){ 
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        rut:user.rut,
        apellido: user.apellido,
        fechaCreacion: user.create_at,
        telefono: user.telefono,
        email: user.email,
        iat: moment().unix(),     
        //dura 1 dia el token
        exp: moment().add(1,'days').unix()
    };
    return jwt.sign(payload, secret);
};
