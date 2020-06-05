//imports
//routing
module.exports = {
    version: function (req, res) {
        //TODO
        return res.status(200).json({
            version: 1.0
        });
    },
    pleasePost: function (req, res) {
        //TODO
        return res.status(400).json({
            usage: 'post header needed'
        });
    }
}
