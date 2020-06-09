//imports
const express = require('express');
const api = require('./routes/apiController');
const user = require('./routes/userController');
const event = require('./routes/eventController');
const time = require('./routes/timeController');
const answer = require('./routes/answerController');

const apiRouter = express.Router();
const route = api.makeRoute;


//routing
exports.router = (function () {

    //USER ROUTING
    route(apiRouter, '/user/',                      api.GET,    api.userAction);
    route(apiRouter, '/user/register',              api.POST,   user.register);
    route(apiRouter, '/user/login',                 api.POST,   user.login);
    route(apiRouter, '/user/list',                  api.GET,    user.list);
    route(apiRouter, '/user/:id',                   api.GET,    user.getUser);
    route(apiRouter, '/user/:id/event/list',        api.GET,    user.getUserEvents);
    route(apiRouter, '/user/:id/event/:idE',        api.GET,    user.getUserEvent);

    //EVENT ROUTING
    route(apiRouter, '/event/create',               api.POST,   event.create);
    route(apiRouter, '/event/list',                 api.GET,    event.list)
    route(apiRouter, '/event/:id',                  api.GET,    event.getEvent);
    route(apiRouter, '/event/:id/time/create',      api.POST,   time.create);
    route(apiRouter, '/event/:id/time/:idT',        api.PATCH,  time.changeTime);
    route(apiRouter, '/event/:id/time/:idT/answer', api.POST,   answer.create);
    route(apiRouter, '/event/:id/time/:idT/answer', api.PATCH,  answer.changeAnswer);

    //api routing
    route(apiRouter, '/version/',                   api.GET,    api.version);
    route(apiRouter, '',                            api.GET,    api.use);
    route(apiRouter, '*',                           api.GET,    api.badUrl);
    route(apiRouter, '*',                           api.POST,   api.badUrl);
    route(apiRouter, '*',                           api.PUT,    api.badUrl);
    route(apiRouter, '*',                           api.PATCH,  api.badUrl);

    return apiRouter;

})();

