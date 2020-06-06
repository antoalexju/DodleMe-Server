//imports
//let bcrypt = require('bcrypt');
const User = require('../models/User');
const Event = require('../models/Event');
const Time = require('../models/Time');
const Answer = require('../models/Answer');
const IdentifiedUser = require('../models/IdentifiedUser');

User.hasMany(IdentifiedUser, {foreignKey: 'idIdentifiedUser', as: 'information'});
IdentifiedUser.belongsTo(User, {foreignKey: 'idIdentifiedUser', as: 'information'});

User.hasMany(Answer, {foreignKey: 'idUser', as: 'answers'});
Answer.belongsTo(User, {foreignKey: 'idUser', as: 'answers'});

//routing
module.exports = {
    register: function (req, res) {
        //TODO
        return res.status(200).json({
            message: "L'utilisateur a bien été enregistré !"
        });
    },
    login: function (req, res) {
        //TODO
        return res.status(200).json({
            message: "Connexion réussie !"
        });
    },
    list: function (req, res) {
        return User.findAll()
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
        return User.findOne({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: IdentifiedUser,
                    required: false,
                    as: 'information'
                }
            ],
        }).then(user => {
            if(user != null) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        }).catch(err => {
            res.status(404).json({
                error: err + '',
                code: 404
            });
        })
    },
    getUserEvents: function (req, res) {
        return User.findAll({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: Event,
                    required: false,
                    as: 'events'
                }
            ],
        }).then(user => {
            if(user != null) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        }).catch(err => {
            res.status(404).json({
                error: err + '',
                code: 404
            });
        })
    },
    getUserEvent: function (req, res) {
        return User.findAll({
            where: {
                idUser: req.params.id
            },
            include: [
                {
                    model: Event,
                    required: true,
                    as: 'events',
                    where: {
                        idEvent: req.params.idE
                    }
                },
                {
                    model: Answer,
                    required: false,
                    as: 'answers'
                }
            ],
        }).then(user => {
            if(user != null) res.status(200).json(user);
            else throw new Error("User: " + req.params.id + " not found");
        }).catch(err => {
            res.status(404).json({
                error: err + '',
                code: 404
            });
        })
    }
}
