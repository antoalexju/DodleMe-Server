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
    allowNull: false
  },
  lastName: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: false
  },
  mail: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: false
  },
  pass: {
    type: sequelize.DataTypes.CHAR(64),
    allowNull: false
  },
  organisation: {
    type: sequelize.DataTypes.STRING(25),
    allowNull: true
  },
  signupDate: {
    type: sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'IdentifiedUser'
});
