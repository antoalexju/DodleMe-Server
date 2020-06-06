const User = require('../models/User');
const Event = require('../models/Event');
const Time = require('../models/Time');

User.hasMany(Event, {foreignKey: 'creator', as: 'events'});
Event.belongsTo(User, {foreignKey: 'creator', as: 'events'});

Event.hasMany(Time, {foreignKey: 'idEventAttached', as: 'times'});
Time.belongsTo(Event, {foreignKey: 'idEventAttached', as: 'times'});

//routing
module.exports = {
    list: function (req, res) {

        return Event.findAll({
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

        return Event.findOne({
            where: {
                idEvent: req.params.id
            },
            include: [{
                model: Time,
                required: false,
                as: 'times'
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

    }
}
