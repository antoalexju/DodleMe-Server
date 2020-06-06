//imports
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
    }
}
