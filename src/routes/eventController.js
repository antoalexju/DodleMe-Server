const rel = require('../models/relation');

//routing
module.exports = {
    list: function (req, res) {
        rel.Event.findAll()
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
        rel.Event.findOne({
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
        rel.Event.create({
                creator: req.query.creator,
                linkId: req.query.linkId,
                title: req.query.title,
                location: req.query.location,
                description: req.query.description,
                limitDate: req.query.limitDate,
                status: req.query.status,
                isPrivate: req.query.isPrivate,
                finalDate: req.query.finalDate
        })
        .then(event => {
            res.status(200).json({
                message: "L'événement a bien été enregistré !",
                details: event
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err + '',
                code: 404
            });
        });
    }
}
