const sequelize = require('sequelize');
const db = require('../database.js');

module.exports = db.sequelize.define('Time', {
  idTime: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  beginDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: false
  },
  idEventAttached: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    references: {
      model: 'Event',
      key: 'idEvent'
    }
  }
}, {
  tableName: 'Time'
});
