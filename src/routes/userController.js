//imports
//let bcrypt = require('bcrypt');
const rel = require('../database/models/relation');


//routing
module.exports = {
    register: function (req, res) {
        switch (req.query.anon) {
            case 'true':
                rel.User.create({
                        alias: req.body.alias
                }).then(user => {
                    res.status(200).json({
                        message: "L'utilisateur a bien été enregistré !",
                        code: 200,
                        idUser: user.idUser
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: "L'utilisateur n'a pas pu être enregister",
                        code: 500,
                        error: err
                    });
                });
                break;
            case 'false':
                rel.User.create({
                        alias: req.body.firstName + ' ' + req.body.lastName,
                        information: [{
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            pass: req.body.password,
                            mail: req.body.mail,
                            organisation: req.body.organisation
                        }]
                    },
                    {
                        include: [{
                            model: rel.IdentifiedUser,
                            as: 'information'
                        }]
                    }).then(user => {
                        res.status(200).json({
                            message: "L'utilisateur a bien été enregistré !"
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: "L'utilisateur n'a pas pu être enregister",
                            code: 500,
                            error: err
                        });
                    });
                break;
            default:
                console.log(req.query.anon)
        }
    },
    login: function (req, res) {
        //TODO
        res.status(200).json({
            message: "Connexion réussie !"
        });
    },
    list: function (req, res) {
        rel.User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).json({
                error: err,
                code: 404
            });
        })
    },
    getUser: function (req, res) {
        rel.User.findOne({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: rel.IdentifiedUser,
                    required: false,
                    as: 'information',
                    attributes: {
                        exclude: ['pass', 'idIdentifiedUser']
                    }
                }
            ],

        })
        .then(user => {
            if(user != null) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        })
        .catch(err => {
            res.status(404).json({
                error: err,
                code: 404
            });
        })
    },
    getUserEvents: function (req, res) {
        rel.User.findAll({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: rel.Event,
                    required: false,
                    as: 'events'
                }
            ],
            attributes:{
                exclude: ['signupDate', 'alias', 'idUser']
            }
        })
        .then(user => {
            if(user != null) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        })
        .catch(err => {
            res.status(404).json({
                error: err,
                code: 404
            });
        })
    },
    getUserEvent: function (req, res) {
        rel.User.findAll({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: rel.Answer,
                    required: false,
                    as: 'answers',
                    attributes: {
                        exclude: ['idUser']
                    },
                    include: {
                        model: rel.Time,
                        required: false,
                        as: 'time',
                        attributes: {
                            exclude: ['idEventAttached', 'idTime'],
                        }
                    }
                }
            ],
            attributes:{
                exclude: ['signupDate', 'alias', 'idUser']
            }
        })
        .then(user => {
            if(user != null || user !== [] ) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        })
        .catch(err => {
            res.status(404).json({
               error: err,
               code: 404
            });
        })
    }
}
