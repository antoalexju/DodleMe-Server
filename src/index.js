//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

var express = require('express');
var app = express();

app.use(express.static('../../DodleMe-WebUI/dist/'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

var server = app.listen(80, '10.0.0.37',  function () {
    console.log('Node server is running...');
});
