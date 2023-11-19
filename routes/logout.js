var express = require('express');
var router = express.Router();

app.get('/logout', (req, res) => {
    res.clearCookie('jwt'); //Removes session cookie
    res.redirect('/'); //Redirects to homepage
});