var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;
