var express = require('express');
var auth = require('./auth');
var verifikasi = require('./verifikasi');
var router = express.Router();


//image
const multer = require('multer');

//storage engine
const storage = multer.diskStorage({
    destination: 'certificate',
    filename: (req,file,cb)=>{ //cb=callback
        // return cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
        return cb(null, req.body.sertificate_filename) //nama original dari gambar yang diupload
    }
})
const upload = multer({storage: storage});


//daftarkan menu registrasi
router.post('/api/v1/register', upload.single('file'), auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi
router.get('/api/v1/role',verifikasi(), auth.aksesrole);
module.exports = router;