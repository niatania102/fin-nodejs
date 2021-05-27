var mysql = require('mysql');

//buat koneksi
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fin_capstone'
  });

  conn.connect((err)=>{
      if(err) throw err;
      console.log('MySql Terkoneksi');
  });

  module.exports = conn;