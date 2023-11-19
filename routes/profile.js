var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../controllers/middleware')

/* GET Profile page
   (Protected Route with JWT)  */
router.get('/auth/profile', authenticateToken, (req, res) => {
    //Will only get here if the authenticateToken middleware function calls next()

    res.render('profile', { currentPage: "profile", title: 'Profile', currentUser: req.user });
});

module.exports = router;
