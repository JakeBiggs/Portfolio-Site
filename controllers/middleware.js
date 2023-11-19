const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
};

//Checks if user is logged in
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
};

exports.redirectIfLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        res.redirect('/');
    } else {
        next();
    }
}