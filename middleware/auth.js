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
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phone_number: req.body.phone_number,
        status: 'Active',
        address: req.body.address,
        timecreated: new Date(),
        timemodified: new Date()
    }
    //Unique Email, belum ada email sebelumnya
    var query = "SELECT email FROM ?? WHERE ??";
    var table = ["users","email",post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows)){
        if(error)
        {
            console.log(error);
        }else{
            if(rows.length == 0){ //kalau tidak ada email sebelumnya
                var query = "INSERT INTO ?? SET ?";
                var table = ["users"];
                query = mysql.format(query,table);
                connection.query(query, post, function(error,rows){
                    if(error)
                    {
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambah data user baru",res);
                    }
                });
            }else{
                response.ok("Email sudah terdaftar!");
            }
        }
    }
}