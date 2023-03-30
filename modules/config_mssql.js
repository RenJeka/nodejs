const mssql = require('mssql');


// // PRODUCT

const tableName = 'tourneys'

const config = {
    user: 'jeka',
    password: '333',
    server: 'localhost',
    database: 'birthdays',
    port: 3306,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    trustServerCertificate: true,
};


// // DEVELOP
// const tableName = 'test_table_1'
//
//
// const config = {
//     user: 'test',
//     password: '123',
//     server: 'localhost',
//     database: 'testdb',
//     port: 1433,
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     trustServerCertificate: true,
// };

// --------------------------------------

const connection = new mssql.ConnectionPool(config);

const pool = connection.connect((err) => {
    if (err) console.log(err);
});

module.exports = {
    pool: pool,
    tableName: tableName
};
