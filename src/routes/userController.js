//imports
//let bcrypt = require('bcrypt');
const rel = require('../models/relation');


//routing
module.exports = {
    register: function (req, res) {
        rel.User.create({
            alias: 'Test1',
            information: [{
                firstName: req.query.firstName,
                lastName: req.query.lastName,
                pass: req.query.password,
                mail: req.query.mail,
                organisation: req.query.organisation
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
        });
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
                error: err + '',
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
                error: err + '',
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
                error: err + '',
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
               error: err + '',
               code: 404
            });
        })
    }
}
