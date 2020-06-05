//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

//imports
let express = require('express');
let bodyParser = require('body-parser');
let apiRouter = require('./apiRouter').router;

let server = express();

//server config
server.use(express.static('../DodleMe-WebUI/dist/'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.set('json spaces', 4);

server.use('/api', apiRouter);

server.get('/api', (req, res) => {
    res.status(400).json({
        message: "empty query"
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

server.listen(80, '0.0.0.0', function () {
    console.log('Node server is running...');
});


