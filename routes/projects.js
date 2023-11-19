//import {parseJSON} from './plugins/custom-JSON-parser/jsonparser.js';
var express = require('express');
var fs = require('fs');
var jsonparser = require('C:/Users/Jake/Documents/UNI WORK/YEAR 2/COMP202  (webtech)/COMP202-2207976/public/plugins/custom-JSON-parser/jsonparser.js')

var router = express.Router();

//Get Project List from JSON
//var projectsData = JSON.parse(fs.readFileSync('projects.json', 'utf-8'));
var projectsData = jsonparser.parseJSON(fs.readFileSync('projects.json', 'utf-8'));


/* GET Projects page. */
router.get('/projects', function (req, res, next) {
    res.render('projects', { currentPage: "projects", title: 'Projects', projectsData: projectsData });
});

module.exports = router;
