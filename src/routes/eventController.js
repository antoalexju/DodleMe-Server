const User = require('../models/User');
const Event = require('../models/Event');

//routing
module.exports = {
    list: function (req, res) {
        return Event.findAll()
            .then(events => {
                res.status(200).json(events);
            })
            .catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            })
    }
}
