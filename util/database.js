// const mysql = require('mysql2');

// const pool = mysql.createPool( {
//     host: 'localhost',
//     user: 'root',
//     database: 'server',
//     password: 'Behungry@15'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('server', 'root', 'Behungry@15', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;