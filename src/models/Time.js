const sequelize = require('sequelize');
const db = require('../config/db.js');

module.exports = db.sequelize.define('Time', {
  idTime: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  beginDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: true
  },
  idEventAttached: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    references: {
      model: 'Event',
      key: 'idEvent'
    }
  }
}, {
  tableName: 'Time'
});
