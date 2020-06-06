//imports
const express = require('express');
const userController = require('./routes/userController');
const eventController = require('./routes/eventController');
const apiController = require('./routes/apiController');

const POST = 0;
const GET = 1;

/**
 * simplifie la creation de route
 * @param apiRouter
 * @param prefix
 * @param method
 * @param controller
 */
function makeRoute(apiRouter, prefix, method, controller) {
    switch (method) {
        case POST:
            apiRouter.route(prefix).get(apiController.pleasePost);
            apiRouter.route(prefix).post(controller);
            break;
        case GET:
            apiRouter.route(prefix).get(controller);
            apiRouter.route(prefix).post(apiController.pleasePost);
            break;
        default:
            apiRouter.route(prefix).post(apiController.badMethod);
    }
}

//routing
exports.router = (function () {
    let apiRouter = express.Router();

    //app routing
    let user = '/user';
    let event = '/event';

    //USER ROUTING
    makeRoute(apiRouter, user + '/register', POST, userController.register);

    makeRoute(apiRouter, user + '/login', POST, userController.login);

    makeRoute(apiRouter, user + '/list', GET, userController.list);

    makeRoute(apiRouter, user + '/:id', GET, userController.getUser);

    makeRoute(apiRouter, user + '/:id' + event + '/list', GET, userController.getUserEvents);

    makeRoute(apiRouter, user + '/:id' + event + '/:idE', GET, userController.getUserEvent);

    //EVENT ROUTING
    makeRoute(apiRouter, event + '/list', GET, eventController.list)

    makeRoute(apiRouter, event + '/:id', GET, userController.getEvent);

    //api routing
    makeRoute(apiRouter, '/version/', GET, apiController.version);
    makeRoute(apiRouter, '*', GET, apiController.badUrl);
    makeRoute(apiRouter, '*', POST, apiController.badUrl);

    return apiRouter;

})();

