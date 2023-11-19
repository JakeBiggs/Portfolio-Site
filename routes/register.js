var express = require('express');
var router = express.Router();

/* GET Register page. */
router.get('/auth/register', function (req, res, next) {
    res.render('register', { currentPage: "register",title: 'Register' });
});

module.exports = router;
