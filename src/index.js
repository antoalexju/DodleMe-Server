//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = io.listen(server);

//app.use(express.static('/home/dodle/DodleMe-WebUI/dist/'));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../../dodle/DodleMe-WebUI/dist/' })
});
//app.get( '/', routes.index );

server.listen(80, '0.0.0.0', function () {
    console.log('Node server is running...');
});
