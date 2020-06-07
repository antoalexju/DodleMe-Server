//imports
const express = require('express');
const api = require('./routes/apiController');
const user = require('./routes/userController');
const event = require('./routes/eventController');

const apiRouter = express.Router();
const route = api.makeRoute;


//routing
exports.router = (function () {

    //USER ROUTING
    route(apiRouter, '/user/register', api.POST, user.register);
    route(apiRouter, '/user/login', api.POST, user.login);
    route(apiRouter, '/user/list', api.GET, user.list);
    route(apiRouter, '/user/:id', api.GET, user.getUser);
    route(apiRouter, '/user/:id/event/list', api.GET, user.getUserEvents);
    route(apiRouter, '/user/:id/event/:idE', api.GET, user.getUserEvent);

    //EVENT ROUTING
    route(apiRouter, '/event/create', api.POST, event.create);
    route(apiRouter, '/event/list', api.GET, event.list)
    route(apiRouter, '/event/:id', api.GET, event.getEvent);
    route(apiRouter, '/event/:id/answer', api.POST, event.newAnswer);
    route(apiRouter, '/event/:id/answer', api.PATCH, event.changeAnswer);

    //api routing
    route(apiRouter, '/version/', api.GET, api.version);
    route(apiRouter, '*', api.GET, api.badUrl);
    route(apiRouter, '*', api.POST, api.badUrl);
    route(apiRouter, '*', api.PUT, api.badUrl);
    route(apiRouter, '*', api.PATCH, api.badUrl);

    return apiRouter;

})();

