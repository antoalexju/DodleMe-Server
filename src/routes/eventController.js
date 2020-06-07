const rel = require('../models/relation');

//routing
module.exports = {
    list: function (req, res) {

        return rel.Event.findAll({
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
    },
    getEvent: function (req, res) {

        return rel.Event.findOne({
            where: {
                idEvent: req.params.id
            },
            include: [
                {
                    model: rel.Participant,
                    required: false,
                    as: 'participants'
                },
                {
                    model: rel.Time,
                    required: false,
                    as: 'times',
                    attributes: {
                        exclude: ['idEventAttached'],
                    },
                    include: {
                        model: rel.Answer,
                        required: false,
                        as: 'answers',
                        attributes: {
                            exclude: ['idTime']
                        },
                        include:{
                            model: rel.User,
                            required: true,
                            as: 'user',
                            attributes: {
                                exclude: ['idUser', 'signupDate']
                            }
                        }
                    }
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

    },
    create: function (req, res) {
        //TODO
    }
}
