const mysql = require('mysql2');

const pool = mysql.createPool( {
    host: 'localhost',
    user: 'root',
    database: 'server',
    password: 'Behungry@15'
});

module.exports = pool.promise();