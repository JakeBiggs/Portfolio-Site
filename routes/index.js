var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { currentPage: "index", title: 'Portfolio' });
});

module.exports = router;

