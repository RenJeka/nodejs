const queries = require('../database/queries');

function showAddPage(req, res, next) {
    res.render('add_item');
}

function addNewItem(req, res, next) {
    queries.addItem(req, res);
}

module.exports = {
    showAddPage,
    addNewItem
};
