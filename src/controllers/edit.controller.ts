import queries from "../database/queries.js";

function showEditPage(req, res, next) {
    queries.getItemByID(req, res);
}

function changeItem(req, res) {
    queries.updateItemByID(req, res);
}

function removeItem(req, res) {
    queries.deleteItemByID(req, res)
}

export default {
    showEditPage,
    changeItem,
    removeItem
};
