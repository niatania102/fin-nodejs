'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("jalan",res);
}

//tampilkan semua user
exports.tampilsemuauser = function(req,res){
    connection.query('SELECT * FROM users', function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//tampilkan semua user berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM users WHERE users_id = ? ', [id], function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};