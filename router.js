'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemuauser);

    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);


    //forum header
    app.route('/tambahforum')
        .post(jsonku.tambahforum);
    app.route('/ubahforum')
        .put(jsonku.ubahforum);
    app.route('/tampilforum')
        .get(jsonku.tampilgroupforum);

    //forum reply
    app.route('/tambahforumbalasan')
        .post(jsonku.tambahforumbalasan)
    app.route('/ubahforumbalasan')
        .put(jsonku.ubahforumbalasan)
    app.route('/tampilreply')
        .get(jsonku.tampilgroupbalasan)

    //journal
    app.route('/tambahjurnal')
        .post(jsonku.tambahjurnal)
    app.route('/ubahjurnal')
        .put(jsonku.ubahjurnal)
    app.route('/tampiljurnal')
        .get(jsonku.tampilsemuajurnal)
    app.route('/tampiljurnal/:id')
        .get(jsonku.tampiljurnalid)

    //konsultasi
    app.route('/tambahkonsultasi')
        .post(jsonku.tambahkonsultasi)
    app.route('/ubahkonsultasi')
        .put(jsonku.ubahkonsultasi)
    app.route('/tampilkonsultasi')
        .get(jsonku.tampilsemuakonsultasi)
    app.route('/tampilkonsultasi/:id')
        .get(jsonku.tampilkonsultasiid)
}