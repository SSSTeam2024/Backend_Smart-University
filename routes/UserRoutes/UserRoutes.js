const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserControllers/UserControllers');

router.get('/get-all-users', userController.getAllUsers);
router.post('/create-user', userController.createUser);
router.post('/login-user', userController.loginUser);
router.post('/logout-user/:id', userController.logoutUser);
router.put('/update-user/:id', userController.updateUser);
router.post('/get-user-by-token', userController.getUserByToken);
module.exports = router;