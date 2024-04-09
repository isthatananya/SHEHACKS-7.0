const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// router.get('/', UserController.getAllUsers);

// router.get('/:userId', UserController.getUserById);

router.post('/register', UserController.register);
router.post('/login', UserController.login);



module.exports = router;
