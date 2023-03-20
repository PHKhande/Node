const Sequelize = require('sequelize');

const sequelize = require('../../util/ExpenseTracker/database');

const ExpTrckUser = sequelize.define( 'user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    isPremium: Sequelize.BOOLEAN,

    totalExpense: Sequelize.DOUBLE

});

module.exports = ExpTrckUser;