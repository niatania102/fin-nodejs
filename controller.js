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
    connection.query('SELECT * FROM users WHERE id = ? ', [id], function(error, rows,fields){
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
    var timecreated = new Date();
    var timemodified = new Date();

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
    var timemodified = new Date();

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

//menampilkan topic forum header group
exports.tampilgroupforum = function(req,res){
    connection.query('SELECT u.id, u.username, u.full_name, f.forum_id, f.topic, f.content FROM forum_header AS f JOIN users AS u WHERE f.user_id = u.id',
        function(error, rows,fields){
            if(error){
                connection.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    )
}

//menambah data forum reply
exports.tambahforumbalasan = function(req,res){
    var fid = req.body.forum_id;
    var uid = req.body.user_id;
    var replies = req.body.replies;
    var timecreated = new Date();
    var timemodified = new Date();

    connection.query('INSERT INTO forum_replies (forum_id,user_id,replies,timecreated,timemodified) VALUES(?,?,?,?,?)',
        [fid,uid,replies,timecreated,timemodified],
        function(error,rows,fields){
            if(error){
                connection.log(error);
            }else {
                response.ok("Berhasil menambahkan data forum!", res)
            }
        });
};

//mengubah data forum reply berdasarkan id
exports.ubahforumbalasan = function(req,res) {
    var rid = req.body.reply_id;
    var uid = req.body.user_id;
    var replies = req.body.replies;
    var timemodified = new Date();

    connection.query('UPDATE forum_replies SET replies=?, timemodified=? WHERE reply_id=? AND user_id=?',
        [replies,timemodified,rid,uid],
        function(error,rows,fields){
            if(error){
                connection.log(error);
            }else {
                response.ok("Berhasil ubah data forum reply!", res)
            }
        });
};

//menampilkan balasan jurnal
exports.tampilgroupbalasan = function(req,res){
    let forum_id = req.params.forum_id;

    connection.query('SELECT fh.forum_id, fh.topic, fh.content, fr.reply_id, fr.replies FROM `forum_header` AS fh left JOIN `forum_replies` AS fr ON fh.forum_id = fr.forum_id WHERE fh.forum_id = ? ORDER BY topic'
    [forum_id],
        function(error,rows,fields){
            if(error){
                connection.log(error)
            }else {
                response.ok(rows,res)
            }
        });
}

//menambah jurnal
exports.tambahjurnal = function(req,res) {
    var uid = req.body.user_id;
    var content = req.body.content;
    var timecreated = new Date();
    var timemodified = new Date();

    connection.query('INSERT INTO journal (user_id,content,timecreated,timemodified) VALUES(?,?,?,?)',
        [uid,content,timecreated,timemodified],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else {
                response.ok("Berhasil tambah jurnal", res)
            }
        })
}

//mengubah jurnal
exports.ubahjurnal = function(req,res) {
    var jid = req.body.journal_id;
    var uid = req.body.user_id;
    var content = req.body.content;
    var timemodified = new Date();

    connection.query('UPDATE journal SET content=? ,timemodified=? WHERE journal_id=? AND user_id=?',
        [content,timemodified,jid,uid],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else {
                response.ok("Berhasil ubah jurnal", res)
            }
        });
}

//tampilkan semua jurnal
exports.tampilsemuajurnal = function(req,res){
    connection.query('SELECT * FROM journal', function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//tampilkan semua jurnal berdasarkan id
exports.tampiljurnalid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM journal WHERE user_id = ? ', [id], function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};


//menambah jadwal konsultasi
exports.tambahkonsultasi = function(req,res){
    var topic = req.body.topic;
    var content = req.body.content;
    var filename = req.body.filename;
    var start_cons = req.body.start_consultation;
    var end_cons = req.body.end_consultation;
    var timecreated = new Date()
    var timemodified = new Date()
    var user_id = req.body.user_id;
    var employee_id = req.body.employee_id

    connection.query('INSERT INTO consultations (topic,content,filename,start_consultation,end_consultation,timecreated,timemodified,user_id,employee_id) VALUES (?,?,?,?,?,?,?,?,?)',
        [topic,content,filename,start_cons,end_cons,timecreated,timemodified,user_id,employee_id],
        function(error,rows,fields){
            if(error){
                connection.log(error);
            }else {
                response.ok("Berhasil menambahkan konsultasi!", res);
            }
        });
}

//mengubah jadwal konsultasi
exports.ubahkonsultasi = function(req,res) {
    var cid = req.body.consultation_id;
    var topic = req.body.topic;
    var content = req.body.content;
    var filename = req.body.filename;
    var start_cons = req.body.start_consultation;
    var end_cons = req.body.end_consultation;
    var timemodified = new Date()
    var user_id = req.body.user_id;
    var employee_id = req.body.employee_id;

    connection.query('UPDATE consultations SET topic=?, content=?, filename=?, start_consultation=?, end_consultation=?, timemodified=? WHERE consultation_id=? AND user_id=? AND employee_id=?',
        [topic,content,filename,start_cons,end_cons,timemodified,cid,user_id,employee_id],
        function(error,rows,fields){
            if(error){
                connection.log(error);
            }else {
                response.ok("Berhasil ubah konsultasi!", res)
            }
        })
}

//tampilkan semua konsultasi
exports.tampilsemuakonsultasi = function(req,res){
    connection.query('SELECT * FROM consultations', function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

//tampilkan konsultasi berdasarkan id
exports.tampilkonsultasiid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM consultations WHERE consultation_id = ? ', [id], function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

