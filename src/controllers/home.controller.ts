import queries from "../database/queries.js";

function showItemsPage(req, res, next) {
    queries.getAllItems(req, res);
}

export default {
    showItemsPage
};
