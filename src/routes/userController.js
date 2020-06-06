//imports
//let bcrypt = require('bcrypt');
const User = require('../models/User');

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
            }
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
