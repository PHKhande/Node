const Sequelize = require('sequelize');

const sequelize = require('../../util/ExpenseTracker/database');

const PremOrder = sequelize.define( 'order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    orderId: {
        type: Sequelize.STRING(255)
    },
    
    status: {
        type: Sequelize.STRING
    },

    paymentId: {
        type: Sequelize.STRING(255)
    }
});

module.exports = PremOrder;