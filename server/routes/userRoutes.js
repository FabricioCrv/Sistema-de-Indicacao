const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAll);
router.post('/register', userController.register);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.post('/login', userController.login);
router.get('/profile', userController.getProfileById);
router.get('/user/:id/score', userController.getScore);
router.put('/user/:id/score', userController.updateScore);

module.exports = router;