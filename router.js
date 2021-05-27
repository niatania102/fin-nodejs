'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemuauser);

    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);


    //forum
    app.route('/tambahforum')
        .post(jsonku.tambahforum);
    app.route('/ubahforum')
        .put(jsonku.ubahforum);
    app.route('/tampilforum')
        .get(jsonku.tampilgroupforum);
}