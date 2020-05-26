//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

var express = require('express');
var app = express();

//app.use(express.static('/home/dodle/DodleMe-WebUI/dist/'));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../../dodle/DodleMe-WebUI/dist/' })
});
//app.get( '/', routes.index );

var server = app.listen(80, 'dodle.antonylaget.com',  function () {
    console.log('Node server is running...');
});
