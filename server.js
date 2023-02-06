const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
require('dotenv').config()
const passport = require('passport');
const methodOverride = require('method-override');
require('./config/database');
require('./config/passport');
const indexRoute = require('./routes/index');
const genRoute = require('./routes/gen');

var app = express();

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.listen(process.env.PORT);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use('/', indexRoute);
app.use('/gen', genRoute);

module.exports = app;