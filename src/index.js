//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

//imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

const server = express();

//server config
server.use(express.static('../DodleMe-WebUI/dist/'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.set('json spaces', 4);
const port = 80;

server.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../DodleMe-WebUI/dist/' })
});

server.use('/api', apiRouter);

server.get('/api', (req, res) => {
    res.status(400).json({
        message: "Dodle.Me API",
        usage: "See documentation on github",
        version: 1
    })
});

server.get('/api/user', (req, res) => {
    res.status(400).json({
        message: "choose user action"
    })
});

server.get('/api/event', (req, res) => {
    res.status(400).json({
        message: "choose event action"
    })
});


server.listen(port, '0.0.0.0', function () {
    console.log('Node server is running... (listening on port: ' + port + ')');
});


