const colors = require('colors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const config = require('./config');
const dbHelper = require('./dbHelper');

const tName = config.tables.users.name;
const tColumns = config.tables.users.columns;

const selectAllUsersQuery   = `SELECT * FROM ${tName}`;
const insertUserQuery       = `INSERT INTO ${tName}(${tColumns.login}, ${tColumns.password}, ${tColumns.email})
                                VALUES(?, ?, ?)`;

let currentUsers;

async function updateAllUsers() {
    try {
        currentUsers = await dbHelper.runDbQuery(selectAllUsersQuery);
    } catch(error) {
        console.log(`Error while updating  all users : ${error}`)
    }
}

module.exports = {
    getAllUsers: async function () {
        if (currentUsers?.length > 0 ) {
            return currentUsers;
        } else {
            await updateAllUsers();
            return currentUsers;
        }

    },
    addUser: async function (body) {

        const itemToAdd = {
            login: body.login?.toString().trim(),
            password: body.pass?.toString().trim(),
            email: body.email?.toString().trim()
        };


        // fields validation on server
        if (!itemToAdd.login || !itemToAdd.password) {
            res.status(400).end('Incorrect form data');
            return;
        }

        // hashing password
        itemToAdd.password = bcrypt.hashSync(itemToAdd.password, 7);

        const preparedQuery = mysql.format(
            insertUserQuery,
            [itemToAdd.login, itemToAdd.password, itemToAdd.email]
        );

        try {
            const resultQuery = await dbHelper.runDbQuery(preparedQuery);
            if (resultQuery.affectedRows === 1) {
                await updateAllUsers();
                return resultQuery.insertId;
            } else {
                return false;
            }
        } catch(error) {
            console.log(`Error while adding user (${JSON.stringify(body)}) : ${error}`)
        }
    }
};
