const Sequelize = require('sequelize');
const config = require('../config/config.json');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        min: 0,
        max: 5,
        acquire: 300000,
        idle: 10000
    },
    dialectOptions: {
        collate: 'utf8mb4_general_ci',
        useUTC: false,
        timezone: config.timezone
    },
    define: {
        timestamps: false,
        freezeTableName: true,
    }

})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;