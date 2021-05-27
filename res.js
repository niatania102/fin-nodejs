'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };
    res.json(data);
    res.end();
};

//response untuk nested forum
exports.oknested = function(values, res){
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.full_name]){
            //buat variabel group nama user
            const group = akumulasikan[item.full_name];
            //cek jika isi array adalah forum
            if(Array.isArray(group.topic)){ //topik yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.topic.push(item.topic)
            }
            else if(Array.isArray(group.content)){ //content yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.content.push(item.content)
            }
            else{
                group.topic = [group.topic, item.topic];
                group.content = [group.content, item.content];
            }
        }
        else{
            akumulasikan[item.full_name] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };

    res.json(data);
    res.end();
}