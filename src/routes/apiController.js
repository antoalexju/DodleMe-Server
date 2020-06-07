//imports

const POST = 0;
const GET = 1;
const PUT = 2;
const PATCH = 3;
const DELETE = 4;

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
            apiRouter.route(prefix).post(controller);
            apiRouter.route(prefix).get(module.exports.pleasePost);
            apiRouter.route(prefix).put(module.exports.pleasePost);
            apiRouter.route(prefix).patch(module.exports.pleasePost);
            apiRouter.route(prefix).delete(module.exports.pleasePost);
            break;
        case GET:
            apiRouter.route(prefix).get(controller);
            apiRouter.route(prefix).post(module.exports.pleaseGet);
            apiRouter.route(prefix).put(module.exports.pleaseGet);
            apiRouter.route(prefix).patch(module.exports.pleaseGet);
            apiRouter.route(prefix).delete(module.exports.pleaseGet);
            break;
        case PUT:
            apiRouter.route(prefix).put(controller);
            apiRouter.route(prefix).get(module.exports.pleasePut);
            apiRouter.route(prefix).post(module.exports.pleasePut);
            apiRouter.route(prefix).patch(module.exports.pleasePut);
            apiRouter.route(prefix).delete(module.exports.pleasePut);
            break;
        case PATCH:
            apiRouter.route(prefix).patch(controller);
            apiRouter.route(prefix).get(module.exports.pleasePatch);
            apiRouter.route(prefix).post(module.exports.pleasePatch);
            apiRouter.route(prefix).put(module.exports.pleasePatch);
            apiRouter.route(prefix).delete(module.exports.pleasePatch);
            break;
        case DELETE:
            apiRouter.route(prefix).delete(controller);
            apiRouter.route(prefix).patch(module.exports.pleaseDelete);
            apiRouter.route(prefix).get(module.exports.pleaseDelete);
            apiRouter.route(prefix).post(module.exports.pleaseDelete);
            apiRouter.route(prefix).put(module.exports.pleaseDelete);
            break;
        default:
            apiRouter.route(prefix).post(module.exports.badMethod);
    }
}

//routing
module.exports = {
    version: function (req, res) {
        return res.status(200).json({
            info: 'Dodle.Me - API, Made by Antony Juliette Alexandre',
            version: 1.0
        });
    },
    pleasePost: function (req, res) {
        return res.status(400).json({
            usage: 'post header needed',
            code: 400
        });
    },
    pleaseGet: function (req, res) {
        return res.status(400).json({
            usage: 'get header needed',
            code: 400
        });
    },
    pleasePut: function (req, res) {
        return res.status(400).json({
            usage: 'put header needed',
            code: 400
        });
    },
    pleasePatch: function (req, res) {
        return res.status(400).json({
            usage: 'patch header needed',
            code: 400
        });
    },
    pleaseDelete: function (req, res) {
        return res.status(400).json({
            usage: 'delete header needed',
            code: 400
        });
    },
    badUrl: function (req, res) {
        return res.status(404).json({
            usage: 'bad url, see documentation',
            code: 404
        });
    },
    badMethod: function (req, res) {
        return res.status(501).json({
            usage: 'bad method, see documentation, accepted GET or POST',
            code: 400
        });
    },
    makeRoute,
    POST, GET, PUT, PATCH, DELETE
}
