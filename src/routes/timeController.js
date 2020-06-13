const rel = require('../database/models/relation');

module.exports = {
    create: function (req, res) {
        rel.Time.create({
            beginDate: req.body.beginDate,
            endDate: req.body.endDate,
            idEventAttached: req.body.idEventAttached
        })
            .then(time => {
                res.status(200).json({
                    message: "Le nouveau créneau a bien été enregistré !",
                    details: time,
                    id: time.idTime
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: err + '',
                    code: 404
                });
            });
    },
    changeTime: function (req, res) {

    },
    getTimeList: function (req,res) {

    }
}
