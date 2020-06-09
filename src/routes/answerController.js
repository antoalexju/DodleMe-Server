const rel = require('../models/relation');

module.exports = {
    create: function (req, res) {
        rel.Time.create(
            {
                idUser: req.query.idUser,
                idTime: req.query.idTime,
                answer: req.query.answer
            }).then(answer => {
            res.status(200).json({
                message: "Le nouveau choix de date a bien été enregistré !"
            }).catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            });
        });
    },
    changeAnswer: function (req, res) {
        rel.Time.findOne({
            where: {
                idUser: req.query.idUser,
                idTime: req.query.idTime
            }
        }).then(answer => {
            res.status(200).json({
                message: "Le nouveau choix de date a bien été enregistré !"
            }).catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            });
        });
    }
}