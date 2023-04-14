const queries = require("../database/queries");

function showEditPage(req, res, next) {
    queries.getItemByID(req, res);
}

function changeItem(req, res) {
    queries.updateItemByID(req, res);
}

function removeItem(req, res) {
    queries.deleteItemByID(req, res)
}

module.exports = {
    showEditPage,
    changeItem,
    removeItem
};
