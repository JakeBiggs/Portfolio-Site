var express = require('express');
const { redirectIfLoggedIn } = require('../controllers/middleware');
var router = express.Router();

/* GET Login page. */


router.get('/auth/login', redirectIfLoggedIn ,function (req, res) {
    res.render('login', { currentPage: "login",title: 'Login' });
});

module.exports = router;
