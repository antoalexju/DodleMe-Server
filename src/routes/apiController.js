//imports
//routing
module.exports = {
    version: function (req, res) {
        return res.status(200).json({
            version: 1.0
        });
    },
    pleasePost: function (req, res) {
        return res.status(400).json({
            usage: 'post header needed'
        });
    },
    pleaseGet: function (req, res) {
        return res.status(400).json({
            usage: 'get header needed'
        });
    }
}
