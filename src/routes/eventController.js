const User = require('../models/User');
const Event = require('../models/Event');

User.hasMany(Event, {foreignKey: 'creator', as: 'events'});
Event.belongsTo(User, {foreignKey: 'creator', as: 'events'});

//routing
module.exports = {
    list: function (req, res) {

        return Event.findAll({
                where: {

                },
                include: [{
                    model: User,
                    required: true
                }]
            })
            .then(events => {
                res.status(200).json(events);
            })
            .catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            });

        /*
        return Event.findAll()
            .then(events => {
                res.status(200).json(events);
            })
            .catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            });

         */
    },
    getEvent: function (req, res) {

        return null;

    }
}
