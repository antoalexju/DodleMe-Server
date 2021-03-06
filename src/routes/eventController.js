const db = require("../database/database");

const rel = require('../database/models/relation');

const shortId = require('shortid');

//routing
module.exports = {
    list: function (req, res) {
        rel.Event.findAll({
            raw : true,
            attributes : [
                'Event.*',
                [db.sequelize.fn('date_format', db.sequelize.fn('min', db.sequelize.col('times.beginDate')), '%Y-%m-%d'),'begin'],
                [db.sequelize.fn('date_format', db.sequelize.fn('max', db.sequelize.col('times.endDate')), '%Y-%m-%d'),'end'],
                [db.sequelize.col('userCreator.alias'), 'creatorname'],
                [db.sequelize.literal('(SELECT COUNT(`Participant`.`idEvent`) FROM `Participant` WHERE `Participant`.`idEvent` = `Event`.`idEvent` )'), 'participants'],
            ],
            include : [
                {
                    model : rel.Time,
                    required: false,
                    as: 'times',
                    attributes :[]
                },
                {
                    model: rel.User,
                    required: true,
                    as: 'userCreator',
                    attributes: []

                },
                {
                    model: rel.Participant,
                    required: false,
                    as: 'participants',
                    attributes: [],
                },
            ],
            group : ['Event.idEvent'],
            order: [
                ['idEvent', 'DESC']
            ]
        })
        .then(events => {
            res.status(200).json(events);
        })
        .catch(err => {
            res.status(500).json({
                error: err + '',
                code: 500
            });
        });
    },
    getEvent: function (req, res) {
        rel.Event.findOne({
            where: {
                linkId: req.params.id
            },
            attributes: {
                exclude: ['creator']
            },
            include: [
                {
                    model: rel.User,
                    required: true,
                    as: 'userCreator',
                    attributes: {
                        exclude: ['signupDate']
                    }
                },
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
                                exclude: ['signupDate']
                            }
                        }
                    }
                }]

        })
            .then(event => {
            if(event != null) res.status(200).json(event);
            else throw new Error("Une erreur s'est produite dans la requete")
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
                creator: req.body.creator,
                linkId: generateLinkId(),
                title: req.body.title,
                location: req.body.location,
                description: req.body.description,
                limitDate: req.body.limitDate,
                status: req.body.status,
                isPrivate: req.body.isPrivate,
                finalDate: req.body.finalDate
        })
            .then(event => {
                res.status(200).json({
                    message: "L'événement a bien été enregistré !",
                    details: event,
                    linkId: event.linkId
                })
        })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    code: 500
                });
        });
    },
    getEventTimes: function(req, res){
        rel.Event.findAll({
            where: {
                linkId: req.params.id
            },
            attributes: [],
            include: [
                {
                    model: rel.Time,
                    required: false,
                    as: 'times',
                    attributes: {
                        exclude: ['idEventAttached'],
                        include:[
                            //[db.sequelize.fn('date_format',db.sequelize.col('times.beginDate'), '%Y/%m/%d'),'beginDate']

                            //[db.sequelize.fn('date_format',db.sequelize.col('times.endDate'), '%Y/%m/%d'),'endDate'],

                            [db.sequelize.fn('datediff',db.sequelize.col('times.beginDate'), db.sequelize.col('times.endDate')),'duration'],
                        ]
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
                }
            ]
        })
            .then(times => {
                if(times !== null || times[0] !== undefined) {
                    res.status(200).json(times[0].times);
                }
                else throw new Error("Une erreur s'est produite dans la requete")
        })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    code: 500
                });
            });
    },
    getIdFromLink(linkId){
        return new Promise( resolve => {
            rel.Event.findAll({
                where: {
                    linkId: linkId
                }
            }).then(event => {
                resolve(event[0]);
            }).catch(err => {
                resolve(err) ;
            });
        })
    }
}

function generateLinkId(){
    return shortId.generate();
}
