//imports
let bcrypt = require('bcrypt');

//routing
module.exports = {
    register: function (req, res) {
        return res.status(200).json({
            message: "L'utilisateur a bien été enregistré !"
        });
    },
    login: function (req, res) {
        //TODO
        return res.status(200).json({
            message: "Connexion réussie !"
        });
    }
}
