//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

//imports
const cors = require('cors');
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

server.use(cors({ // https://expressjs.com/en/resources/middleware/cors.html
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
}));

server.get('/app', function (req, res) {
    res.sendFile('index.html', { root: '../DodleMe-WebUI/dist/' })
});

server.use('/api', apiRouter);

server.listen(port, '0.0.0.0', function () {
    console.log('Node server is running... (listening on port: ' + port + ')');
});


