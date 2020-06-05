//imports
let express = require('express');
let userController = require('./routes/userController');
let apiController = require('./routes/apiController');


//routing
exports.router = (function () {
    let apiRouter = express.Router();

    //User routes
    apiRouter.route('/version/').get(apiController.version);

    apiRouter.route('/user/register/').get(apiController.pleasePost);
    apiRouter.route('/user/register/').post(userController.register);

    apiRouter.route('/user/login/').get(apiController.pleasePost);
    apiRouter.route('/user/login/').post(userController.login);

    return apiRouter;
})();