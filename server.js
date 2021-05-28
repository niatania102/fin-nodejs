const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan');
const app = express();


//parse application/json
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.json());


app.use(morgan('dev'));

//panggil route
var routes = require('./router');
routes(app);

//daftarkan menu routes dari index
app.use('/auth',require('./middleware'));

app.listen(3000,() => {
    console.log('Server started on port');
});