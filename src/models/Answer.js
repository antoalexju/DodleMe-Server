const sequelize = require('sequelize');
const db = require('../config/db.js');

module.exports = db.sequelize.define('Answer', {
    idUser: {
        type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'idUser'
        }
    },
    idTime: {
        type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Time',
            key: 'idTime'
        }
    },
    answer: {
        type: sequelize.DataTypes.ENUM('yes','no','ifneeded'),
        allowNull: false
    }
}, {
    tableName: 'Answer'
});
