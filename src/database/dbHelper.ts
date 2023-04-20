import util from "util";
import colors from 'colors';
import config from './config';

const pool = config.pool;

export default {
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
