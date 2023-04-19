import queries from '../database/queries.js';

function showAddPage(req, res, next) {
    res.render('add_item');
}

function addNewItem(req, res, next) {
    queries.addItem(req, res);
}

export default {
    showAddPage,
    addNewItem
};