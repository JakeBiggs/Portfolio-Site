//Dependencies
var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

//Define Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var projectsRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');


var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
/*
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');
*/

const {checkUser } = require('./controllers/middleware');
const { url } = require('inspector');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkUser);

//Use Routes
app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/', projectsRouter);
app.use('/', contactRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/auth', require('./routes/auth'));
app.use('/users', usersRouter);

//Parse URL encoded bodies (sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//Parse JSON bodies (sent by API clients not for loading data projects/jobs)
app.use(express.json());



//Helper functions
hbs.registerHelper('eq', function(a, b) {
  return a === b;
});

hbs.registerHelper('ne', function(a, b) {
  return a !== b;
});

hbs.registerHelper('isEven', function(a, options) {
  if(a % 2 == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//MySQL Database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE, 
});

db.connect( (err)=>{
  if(err){ console.log(err);} else console.log("MYSQL CONNECTED...");
});



module.exports = app;
