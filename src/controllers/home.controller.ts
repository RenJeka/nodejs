import queries from "../database/queries";

function showItemsPage(req, res, next) {
    queries.getAllItems(req, res);
}

export default {
    showItemsPage
};
