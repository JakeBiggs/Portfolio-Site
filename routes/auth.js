var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const {authenticateToken} = require('../controllers/middleware')


router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authenticateToken, authController.profile);
router.get('/logout', authController.logout);



module.exports = router