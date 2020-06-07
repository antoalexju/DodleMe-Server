const sequelize = require('sequelize');
const db = require('../database.js');

module.exports = db.sequelize.define('Participant', {
  idEvent: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Event',
      key: 'idEvent'
    }
  },
  idUser: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Participant'
});
