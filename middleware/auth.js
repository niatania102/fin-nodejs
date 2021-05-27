var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req,res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        full_name: req.body.full_name,
        //if there's sertificate then role 2, if there's is_admin then role 1, other role 3
        role_id: req.body.sertificate_filename ? 2 : req.body.is_admin ? 1 : 3,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phone_number: req.body.phone_number,
        status: 'Active',
        address: req.body.address,
        sertificate_filename: req.body.sertificate_filename,
        timecreated: new Date(),
        timemodified: new Date()
    }
    //Unique Email, belum ada email sebelumnya
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["users","email",post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){ //kalau tidak ada email sebelumnya
                var query = "INSERT INTO ?? SET ?";
                var table = ["users"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error,rows){
                    if(error){
                        console.log(error);
                    }else {
                        response.ok("Berhasil menambah data user baru",res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar!",res);
            }
        }
    })
}

//controller untuk login
exports.login = function(req,res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    //apakah ada data user dengan email password dari request
    var query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
    var table = ['users','password', md5(post.password), 'email', post.email]

    query = mysql.format(query,table);
    connection.query(query, function(error, rows){
        if (error){
            console.log(error);
        }else {
            if (rows.length == 1) { //jadi data user ada maka dibuat token
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 86400 //token expire 1 day
                });
                user_id = rows[0].id;
                role_id = rows[0].role_id;

                var data = {
                    user_id: user_id,
                    access_token: token,
                    ip_address: ip.address(),
                }

                //insert to table akses_token
                var query = "INSERT INTO ?? SET?";
                var table = ["akses_token"]

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if (error){
                        console.log(error);
                    }else {
                        res.json({
                            success: true,
                            message: 'Token JWT terkoneksi',
                            token: token,
                            currUser: data.user_id,
                            currRole: role_id
                        });
                    }
                });
            }else {
                res.json({'Error': true, "Message": "Email atu password salah"})
            }
        }
    })
}

// exports.aksesrole = function(req, res){
//     response.ok("Halaman ini hanya untuk user dengan role admin",res);
// }

//tampilkan semua user berdasarkan id
exports.aksesrole = function(req,res){
    connection.query('SELECT * FROM roles', function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};