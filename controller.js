'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

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

//menambah data forum header
exports.tambahforum = function(req,res){
    var uid = req.body.user_id;
    var topic = req.body.topic;
    var content = req.body.content;
    var timecreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var timemodified = new Date().toLocaleString();

    connection.query('INSERT INTO forum_header (user_id,topic,content,timecreated,timemodified) VALUES(?,?,?,?,?)',
        [uid,topic,content,timecreated,timemodified],
        function(error, rows,fields){
            if(error){
                connection.log(error);
            }else{
                response.ok("Berhasil menambahkan data forum!", res);
            }
        });
};

//mengubah data forum berdasarkan id
exports.ubahforum = function(req,res){
    var fid = req.body.forum_id;
    var uid = req.body.user_id;
    var topic = req.body.topic;
    var content = req.body.content;
    var timemodified = new Date().toLocaleString();

    connection.query('UPDATE forum_header SET topic=?, content=? ,timemodified=? WHERE user_id=? AND forum_id=?',
        [topic,content,timemodified,uid,fid],
        function(error, rows,fields){
            if(error){
                connection.log(error);
            }else{
                response.ok("Berhasil ubah data forum!", res);
            }
        });
};

//menampilkan topic forum group
exports.tampilgroupforum = function(req,res){
    connection.query('SELECT u.username, u.full_name, f.forum_id, f.topic, f.content FROM forum_header AS f JOIN users AS u WHERE f.user_id = u.id',
        function(error, rows,fields){
            if(error){
                connection.log(error);
            }else{
                response.oknested(rows, res);
            }
        }
    )

}