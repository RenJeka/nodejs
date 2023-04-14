const config = require('./config');
const colors = require('colors');
const mysql = require("mysql");

const pool = config.pool;
const tableName = config.tableName;
const tColumns = config.tableColumns;

const selectAllItemsQuery   = `SELECT * FROM ${tableName} WHERE ${tColumns.username} = ?`;
const selectItemByIDQuery   = `SELECT * FROM ${tableName} WHERE ${tColumns.id} = ? AND ${tColumns.username} = ?`;
const insertItemQuery       = `INSERT INTO ${tableName}(${tColumns.name}, ${tColumns.description}, ${tColumns.completed}, ${tColumns.username})
                                VALUES(?, ?, ?, ?)`;
const updateItemByIDQuery   = `UPDATE ${tableName}
                                SET name = ?, description = ?, completed = ?
                                WHERE ${tColumns.id} = ? AND ${tColumns.username} = ?`;
const deleteItemByIDQuery   = `DELETE FROM ${tableName} WHERE ${tColumns.id} = ? AND ${tColumns.username} = ?`;


module.exports = {
    getAllItems: function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            const preparedQuery = mysql.format(
                selectAllItemsQuery,
                [req.session.userName]
            );
            connection.query(preparedQuery, (error, results) => {
                if (error) throw error;

                connection.release();

                if (req.url == '/') {
                    res.render('home', {
                        data: results,
                        additionalInfo: {
                            userName: req.session.userName
                        },
                        buttons: false
                    });
                } else {
                    res.render('home', {
                        data: results,
                        additionalInfo: {
                            userName: req.session.userName
                        },
                        buttons: true
                    });
                }
            });
        });
    },

    getItemByID: function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const itemId = req.params.id;
            if (!itemId) throw new Error(`Item ID Not found , please provide correct item ID!`);

            const preparedQuery = mysql.format(
                selectItemByIDQuery,
                [itemId, req.session.userName]
            );
            connection.query(preparedQuery, (error, results) => {
                if (error) throw error;

                connection.release();
                if (results.length === 1) {
                    res.render('edit_item', results[0]);
                }
            });
        });
    },

    addItem: function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            const itemToAdd = {
                name: req.body.name?.toString().trim(),
                description: req.body.description?.toString().trim(),
                completed: parseInt(req.body.completed) ? 1 : 0
            };

            // fields validate on server
            if (!itemToAdd.name) {
                res.status(400).end('Incorrect form data');
                return;
            }

            const preparedQuery = mysql.format(
                insertItemQuery,
                [itemToAdd.name, itemToAdd.description, itemToAdd.completed, req.session.userName]
            );

            connection.query(preparedQuery, (error, results) => {
                if (error) throw error;

                connection.release();
                res.status(201).end('success');
            });
        });
    },

    deleteItemByID: function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const itemId = req.params.id;
            if (!itemId) throw new Error(`Item ID Not found , please provide correct item ID!`);

            const preparedQuery = mysql.format(
                deleteItemByIDQuery,
                [itemId, req.session.userName]
            );
            connection.query(preparedQuery, (error, results) => {
                if (error) throw error;

                connection.release();
                res.status(200).end('deleted');
            });
        });
    },

    updateItemByID: function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const itemId = req.params.id;
            if (!itemId) throw new Error(`Item ID Not found , please provide correct item ID!`);

            console.log(colors.yellow(JSON.stringify(req.body)));

            if (parseInt(req.params.id) !== parseInt(req.body.id)) {
                throw new Error("incorrectly passed ID. Please, check passed ID of item");
            }

            const itemToUpdate = {
                id: req.body.id,
                name: req.body.name?.toString().trim(),
                description: req.body.description?.toString().trim(),
                completed: parseInt(req.body.completed) ? 1 : 0
            };

            if (!itemToUpdate.name) {
                res.status(400).end('Incorrect form data');
                return;
            }
            const preparedQuery = mysql.format(
                updateItemByIDQuery,
                [itemToUpdate.name, itemToUpdate.description, itemToUpdate.completed, itemId, req.session.userName]
            );

            connection.query(preparedQuery, (error, results) => {
                if (error) throw error;

                connection.release();
                res.status(200).end('updated');
            });
        });
    }
};
