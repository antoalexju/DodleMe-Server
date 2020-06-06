//imports
const express = require('express');
const userController = require('./routes/userController');
const eventController = require('./routes/eventController');
const apiController = require('./routes/apiController');


//routing
exports.router = (function () {
    let apiRouter = express.Router();

    //User routes
    apiRouter.route('/version/').get(apiController.version);

    apiRouter.route('/user/register/').get(apiController.pleasePost);
    apiRouter.route('/user/register/').post(userController.register);

    apiRouter.route('/user/login/').get(apiController.pleasePost);
    apiRouter.route('/user/login/').post(userController.login);

    apiRouter.route('/user/list/').get(userController.list);
    apiRouter.route('/user/list/').post(apiController.pleaseGet);

    apiRouter.route('/user/:id/').get(userController.getUser);
    apiRouter.route('/user/:id/').post(apiController.pleaseGet);

    apiRouter.route('/user/:id/events').get(userController.getUserEvents);
    apiRouter.route('/user/:id/events').post(apiController.pleaseGet);

    apiRouter.route('/user/:id/event/:idE/').get(userController.getUserEvent);
    apiRouter.route('/user/:id/event/:idE/').post(apiController.pleaseGet);

    apiRouter.route('/event/list/').get(eventController.list);
    apiRouter.route('/event/list/').post(apiController.pleaseGet);

    apiRouter.route('/event/:id/').get(eventController.getEvent);
    apiRouter.route('/event/:id/').post(apiController.pleaseGet);


    return apiRouter;
})();