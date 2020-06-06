const sequelize = require('sequelize');
const db = require('../config/db.js');

module.exports = db.sequelize.define('Event', {
  idEvent: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  creator: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    references: {
      model: 'User',
      key: 'idUser'
    }
  },
  linkId: {
    type: sequelize.DataTypes.STRING(10),
    allowNull: true
  },
  title: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  location: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  description: {
    type: sequelize.DataTypes.STRING(100),
    allowNull: true
  },
  limitDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: sequelize.DataTypes.ENUM('openned','closed','canceled'),
    allowNull: true
  },
  isPrivate: {
    type: sequelize.DataTypes.INTEGER(1),
    allowNull: true
  },
  finalOption: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true
  }
}, {
  tableName: 'Event'
});
