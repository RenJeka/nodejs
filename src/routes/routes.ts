import { Router } from "express";
import colors from "colors";

const router = Router();
import homeController from '../controllers/home.controller.js';
import authController from '../controllers/auth.controller.js';
import addController from '../controllers/add.controller.js';
import editController from '../controllers/edit.controller.js';

/* GET home page. */

router.get(['/', 'home', '/index.html'], homeController.showItemsPage);

router.get('/auth', authController.showAuthPage);

router.post('/auth', authController.authorizeUser);

router.get('/reg', authController.showRegistrationPage);

router.post('/reg', authController.registerUser);

router.get('/logout', authController.logout);

router.get('/editAll', homeController.showItemsPage);

router.get('/add', addController.showAddPage);

router.post('/add', addController.addNewItem);

router.get('/edit/:id', editController.showEditPage);

router.put('/edit/:id', editController.changeItem);

router.delete('/edit/:id', editController.removeItem);

export default router;
