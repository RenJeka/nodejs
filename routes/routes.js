const { Router } = require('express');
const colors = require('colors');
const router = Router();
const homeController = require('../controllers/home.controller');
const authController = require('../controllers/auth.controller');
const addController = require('../controllers/add.controller');
const editController = require('../controllers/edit.controller');

/* GET home page. */

router.get(['/', 'home', '/index.html'], homeController.showItemsPage);

router.get('/auth', authController.showAuthPage);

router.post('/auth', authController.authorizeUser);

router.get('/logout', authController.logout);

router.get('/editAll', homeController.showItemsPage);

router.get('/add', addController.showAddPage);

router.post('/add', addController.addNewItem);

router.get('/edit/:id', editController.showEditPage);

router.put('/edit/:id', editController.changeItem);

router.delete('/edit/:id', editController.removeItem);

module.exports = router;
