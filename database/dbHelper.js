const util = require("util");
const colors = require('colors');
const config = require('./config');

const pool = config.pool;

module.exports = {
    runDbQuery: async function (preparedSqlQuery) {
        const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

        try {
            let result;
            const connection = await getConnectionAsync();
            const sqlQueryAsync = util.promisify(connection.query).bind(connection);
            result =  await sqlQueryAsync(preparedSqlQuery);

            connection.release();
            return result;
        } catch(error) {
            console.error(`Error while run DB Query: ${error}`)
            throw error;
        }
    }
};
