const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/profile', userController.getProfileById);
router.get('/user/:id/score', userController.getScore);
router.put('/user/:id/score', userController.updateScore);

module.exports = router;