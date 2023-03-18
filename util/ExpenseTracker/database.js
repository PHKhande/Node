const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Behungry@15', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;