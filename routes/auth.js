var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')


/* POST register form. */
//router.post('/register', authController.register);


router.post('/register', authController.register);
router.post('/login', authController.login);
//router.post('/login', authController.login);

module.exports = router