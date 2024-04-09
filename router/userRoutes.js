const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/register', (req,res)=>{
    return res.send('Register');
});
router.post('/register', UserController.register);
router.post('/login', UserController.login);



module.exports = router;
