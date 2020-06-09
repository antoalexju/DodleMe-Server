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

const _ = require('underscore');

function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    var origin = req.headers.origin;
    if (_.contains(app.get('allowed_origins'), origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}

app.use(allowCrossDomain);

server.get('/app', function (req, res) {
    res.sendFile('index.html', { root: '../DodleMe-WebUI/dist/' })
});

server.use('/api', apiRouter);


server.listen(port, '0.0.0.0', function () {
    console.log('Node server is running... (listening on port: ' + port + ')');
});


