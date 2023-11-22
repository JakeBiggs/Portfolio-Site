const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.isLoggedIn = false;
                res.clearCookie('jwt');
                res.redirect('/auth/login');
            } else {
                console.log(decodedToken);
                res.locals.isLoggedIn = true;
                res.locals.currentUser = decodedToken
                next();
            }
        });
    } else {
        res.locals.isLoggedIn = false;
        res.redirect('/auth/login');
    }
};


// Only for rendered pages, no errors!
exports.getLoggedIn = async (req, res, next) => {
console.log(req.cookies);
if (req.cookies.jwt) {
    try {
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    console.log("decoded");
    console.log(decoded);

    // 2) Check if user still exists
    db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result)
        if(!result) {
        return next();
        }
        // THERE IS A LOGGED IN USER
        req.user = result[0];
        res.locals.isLoggedIn = true;
        // res.locals.user = result[0];
        console.log("next")
        return next();
    });
    } catch (err) {
    res.locals.isLoggedIn = false;
    return next();
    }
} else {
    res.locals.isLoggedIn = false;
    next();
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