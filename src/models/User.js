const sequelize = require('sequelize');
const db = require('../config/db.js');

module.exports = db.sequelize.define('User', {
    idUser: {
      type: sequelize.DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: sequelize.DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'User'
});
