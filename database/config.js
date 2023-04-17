const mysql = require('mysql');
const colors = require('colors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const util = require('util');

const todosTableName = 'todos';
const usersTableName = 'users';

const todosTableColumns = {
    id: 'id',
    name: 'name',
    description: 'description',
    completed: 'completed',
    username: 'username'
};

const createTodosTableQuery = `CREATE TABLE ?? (
                            ${todosTableColumns.id} int NOT NULL AUTO_INCREMENT,
                            ${todosTableColumns.name} varchar(50) NOT NULL,
                            ${todosTableColumns.description} varchar(200) DEFAULT NULL,
                            ${todosTableColumns.completed} tinyint NOT NULL DEFAULT '0',
                            ${todosTableColumns.username} varchar(100) NOT NULL,
                            PRIMARY KEY (id),
                            UNIQUE KEY id_UNIQUE (id)
                        ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='table for users todo items';`


const usersTableColumns = {
    id: 'id',
    login: 'login',
    password: 'password',
    email: 'email'
};

const createUsersTableQuery = `CREATE TABLE ?? (
                            ${usersTableColumns.id} int NOT NULL AUTO_INCREMENT,
                            ${usersTableColumns.login} varchar(100) NOT NULL,
                            ${usersTableColumns.password} varchar(100) NOT NULL,
                            ${usersTableColumns.email} varchar(100) DEFAULT NULL,
                            PRIMARY KEY (id),
                            UNIQUE KEY id_UNIQUE (id)
                        ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='table for users credentials';`

const showTablesQuery = 'SHOW TABLES';

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123456',
    database        : 'nodejs_portfolio',
    // createDatabaseTable: false,
    // schema: {
    //     tableName: `${tableName}_session`,
    //     columnNames: {
    //         session_id: 'session_id',
    //         expires: 'expires',
    //         data: 'data'
    //     }
    // }
});

const sessionStore = new MySQLStore({}/* session store options */, pool);

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then( async () => {
    // MySQL session store ready for use.
    const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

    try {
        const connection = await getConnectionAsync();
        const closeConnectionAsync = util.promisify(connection.release).bind(connection);
        await createTableIfNotExist(connection, todosTableName, createTodosTableQuery);
        await createTableIfNotExist(connection, usersTableName, createUsersTableQuery);
        await closeConnectionAsync();
    } catch(error) {
        console.log(error)
    }



}).catch(error => {
    console.error(error);
});

async function createTableIfNotExist(connection, tableName, createTableQuery) {
    const sqlQueryAsync = util.promisify(connection.query).bind(connection);
    if (await checkTable(sqlQueryAsync)) {
        console.log(colors.magenta(`Table "${tableName}" already exist!`));
        return true;
    } else {
        try {
            await createTable(sqlQueryAsync, tableName, createTableQuery);
            console.log(colors.magenta(`table "${tableName}" successfully created!`));
        } catch(error) {
            console.log(error)
        }
    }


    async function checkTable(queryAsync) {
        const existingTables = await getExistingTables(queryAsync);
        return existingTables.indexOf(tableName) >= 0;queryAsync
    }

    async function getExistingTables(queryAsync) {
        try {
            return (await queryAsync(showTablesQuery))
                .map(tableItem => Object.values(tableItem))
                .flat();
        } catch(error) {
            console.log('Error while getting existing tables: ', error);
        }
    }

    async function createTable(queryAsync, tableName, creatingTableQuery) {
        // prepare query
        const inserts = [tableName];
        const preparedQuery = mysql.format(creatingTableQuery, inserts);
        try {
            await queryAsync(preparedQuery)
        } catch(error) {
            console.log(`Error while creating table "${tableName}": `, error)
        }

    }

}

// pool.on('acquire', function (connection) {
//     console.log(colors.red('Connection %d acquired'), connection.threadId);
// });
//
// pool.on('connection', function (connection) {
//     console.log(colors.red('pool connection'));
// });
//
// pool.on('enqueue', function () {
//     console.log(colors.red('pool enqueue'));
// });
//
// pool.on('release', function (connection) {
//     console.log(colors.red('Connection %d released'), connection.threadId);
// });
module.exports = {
    pool,
    sessionStore,
    tables: {
        todos: {
            name: todosTableName,
            columns: todosTableColumns
        },
        users: {
            name: usersTableName,
            columns: usersTableColumns
        }
    }
};
