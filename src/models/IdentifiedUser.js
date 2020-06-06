const sequelize = require('sequelize');
const db = require('../config/db.js');

module.exports = db.sequelize.define('IdentifiedUser', {
  idIdentifiedUser: {
    type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'idUser'
    }
  },
  firstName: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  lastName: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  mail: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  pass: {
    type: sequelize.DataTypes.CHAR(64),
    allowNull: true
  },
  organisation: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  signupDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'IdentifiedUser'
});
