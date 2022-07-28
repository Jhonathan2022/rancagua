
'use strict'

var jwt = require('jsonwebtoken');
var secret='contrasena_21-CConsut4__wunicip4L_oalgo__asií';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message:'La peticion no tiene la cabecera de autentication' });
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    jwt.verify(token,secret,function(err, decoded) {
        if (err) {
            if(err.message == 'jwt expired') return res.status(401).send({ message:'El token ha expirado',tokenoff:true });
            if(err.message == 'invalid signature') return res.status(400).send({ message:'El token no es valido como admin',tokenbad:true});
            if(err.message == 'invalid token') return res.status(400).send({ message:'El token no es valido',tokenedit:true});
        }
        if(decoded){
            req.user = decoded;
            next();
        }
    })
};
