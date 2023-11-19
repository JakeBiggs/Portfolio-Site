var express = require('express');
var fs = require('fs');
var router = express.Router();

//Getting Job list from JSON
var jobsData = JSON.parse(fs.readFileSync('jobs.json', 'utf-8'));



/* GET about page. */
router.get('/about', function (req, res, next) {
    res.render('about', { currentPage: "about", title: "About Me", jobsData: jobsData });
});


module.exports = router;
