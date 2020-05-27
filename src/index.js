//Exemple: https://github.com/rwieruch/node-express-server-rest-api/blob/master/src/index.js

var express = require('express');
var vhost = require('vhost')
var http = require('http')

var app = express();
//var server = require('http').createServer(app)

/*app.use(vhost('dodle.antonylaget.com', function handle (req, res, next) {
    // for match of "foo.bar.example.com:8080" against "*.*.example.com":
    console.dir(req.vhost.host) // => 'foo.bar.example.com:8080'
    console.dir(req.vhost.hostname) // => 'foo.bar.example.com'
    console.dir(req.vhost.length) // => 2
    console.dir(req.vhost[0]) // => 'foo'
    console.dir(req.vhost[1]) // => 'bar'
}))*/

app.use(express.static('../DodleMe-WebUI/dist/'));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: '../DodleMe-WebUI/dist/' })
});
//app.get( '/', routes.index );

// an external api server in any framework
/*var httpServer = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile('index.html', { root: '../DodleMe-WebUI/dist/' })
})

app.use(vhost('dodle.antonylaget.com', function (req, res) {
    // handle req + res belonging to api.example.com
    // pass the request to a standard Node.js HTTP server
    httpServer.emit('request', req, res)
}))*/

server.listen(80, 'localhost', function () {
    console.log('Node server is running...');
});
