const mssql = require('mssql');
const configMSSQL = require('./config_mssql');


async function getAllMSSQLData(req, res) {
    const request = new mssql.Request(configMSSQL.pool);

    const requestData = await request.query(`SELECT * FROM ${configMSSQL.tableName}`, (err, data) => {
        if (err) {
            console.log('Error while query: ', err);
            return;
        }
        console.log('data from MSSQL: ', data);
        // res.send(data.recordset)
        // return data.recordset;
        res.send(JSON.stringify(data.recordset));
    })

    configMSSQL.pool.end();
}

module.exports = {
    getAllMSSQLData: getAllMSSQLData
};
