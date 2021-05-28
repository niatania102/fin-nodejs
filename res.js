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
        if(akumulasikan[item.id]){
            //buat variabel group nama user
            const group = akumulasikan[item.id];
            //cek jika isi array adalah forum
            if(Array.isArray(group.topic)){ //topik yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.topic.push(item.topic)
            }
            else if(Array.isArray(group.content)){ //content yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.content.push(item.content)
            }
            else if(Array.isArray(group.forum_id)){ //content yang sama yang dimiliki seorang user
                group.content.push(item.forum_id)
            }
            else{
                group.topic = [group.topic, item.topic];
                group.content = [group.content, item.content];
                group.forum_id = [group.forum_id, item.forum_id];
            }
        }
        else{
            akumulasikan[item.id] = item;
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

//response untuk nested forum reply
exports.oknestedreply = function(values, res){
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.forum_id]){
            //buat variabel group nama user
            const group = akumulasikan[item.forum_id];
            //cek jika isi array adalah forum
            if(Array.isArray(group.replies)){ //topik yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.replies.push(item.replies)
            }
            else if(Array.isArray(group.reply_id)){ //topik yang sama yang dimiliki seorang user
                //tambah value ke dalam group forum
                group.reply_id.push(item.reply_id)
            }
            else{
                group.replies = [group.replies, item.replies];
                group.reply_id = [group.reply_id, item.reply_id];
            }
        }
        else{
            akumulasikan[item.forum_id] = item;
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