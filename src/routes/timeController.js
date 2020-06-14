const evt = require('./eventController');

const rel = require('../database/models/relation');

module.exports = {
    create: async function (req, res) {
        let e = await evt.getIdFromLink(req.params.id);
        console.log(e.idEvent);
        rel.Time.create({
            beginDate: req.body.beginDate,
            endDate: req.body.endDate,
            idEventAttached: e.idEvent
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
                    error: err,
                    code: 404
                });
            });
    },
    changeTime: function (req, res) {

    },
}
