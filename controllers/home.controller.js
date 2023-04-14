const queries = require("../database/queries");

function showItemsPage(req, res, next) {
    queries.getAllItems(req, res);
}

module.exports = {
    showItemsPage
};
