const Sequelize = require('sequelize');
const config = require('./config.json');

const database = {};
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

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;