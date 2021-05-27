const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        var role = req.body.role;
        //cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if (err){
                    return rest.status(401).send({auth:false, message: 'Token tidak terdaftar'});
                }else { //kalau punya token dan roles 1 admin bisa buka halaman itu
                    if (role==1){
                        req.auth = decoded;
                        next();
                    }else {
                        return rest.status(401).send({auth:false, message: 'Gagal mengotorisasi role anda!'});
                    }
                }
            });
        }else {
            return rest.status(401).send({auth:false, mesage:'Token tidak tersedia'})
        }
    }
}

module.exports = verifikasi;