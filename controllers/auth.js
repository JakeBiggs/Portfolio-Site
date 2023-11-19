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
                // Passwords match  
                // TODO: create session/token and send success response

                return res.render('index', { success_message: 'User logged in' });
                // This part depends on how you handle sessions or tokens
            } else {
                // Passwords don't match, send error response
                return res.render('login', { failure_message: 'Password is incorrect' });
            }
        } else {
            // User doesn't exist, send error response
            return res.render('login', { failure_message: 'No user with that email exists' });
        }
    });
};