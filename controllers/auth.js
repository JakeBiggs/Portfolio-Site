var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//MySQL Database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE, 
  });

exports.register = (req, res) =>{
    console.log(req.body);
    
    const {name, email, password, passwordConfirm} = req.body;

    db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results)=>{
        if(error){
            console.log(error);
        }
        if (results.length > 0){
            return res.render('register', {
                failure_message: "Email already in use."
            });
        }else if(password !== passwordConfirm){
            return res.render('register', {
                failure_message: "Passwords do not match."
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8); //Hashing with 8 rounds of encryption
        //Await because hashing could take longer than 1 compiler cycle, async allows this
        console.log(hashedPassword);
        
        db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword}, (error, results) =>{
            if(error)
            { 
                console.log(error);
            }
            else
            { 
                return res.render('register', {success_message: "User Registered." })
            }
        });
    });
}

exports.login = (req,res)=> {
    const { email, password } = req.body;

    // Find user in the database
    db.query('SELECT email, password FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('login', { failure_message: 'An error occurred' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Passwords match, create json web token
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });  
                
                // Create cookie, store token in cookie and send success response
                //HTTP only means cookie cannot be accessed by client side javascript (helps stop XSS attacks)
                //Max age means cookie will expire after a certain amount of time (helps stop CSRF attacks)
                //Using Number() rather than eval() to convert string to number and stop code execution (also helps against XSS)
                // * 24 * 60 * 60 * 1000 converts days to milliseconds :-) 
                res.cookie('jwt', token, { httpOnly: true, maxAge: eval(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000 }); 
                res.locals.isLoggedIn = true;
                return res.render('index', { currentPage: "index", success_message: 'User logged in' });
                
            } else {
                // Passwords don't match, send error response
                res.locals.isLoggedIn = false;
                return res.render('login', { failure_message: 'Password is incorrect' });
            }
        } else {
            // User doesn't exist, send error response
            return res.render('login', { failure_message: 'No user with that email exists' });
        }
    });
};

exports.logout = (req, res) => {
    res.clearCookie('jwt'); //Removes session cookie
    res.locals.isLoggedIn = false;
    res.redirect('/'); //Redirects to homepage
};


exports.profile = (req, res) => {
    return res.render('profile', { currentPage: "profile", title: 'Profile', currentUser: req.user });
};