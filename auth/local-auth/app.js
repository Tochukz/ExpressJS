var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local'); 

const users = require('./data/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authHandler = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

passport.use(new Strategy((username, password, done) => {
  try {
    const user = users.find(u => u.username.toLowerCase() == username.toLowerCase() && u.password == password);
    if (!user) {
      return done(null, false, {message: 'Your username and/or passport in not correct'});
    }
    return done(null, user);
  } catch(err) {
    // Server/DB Error
    return done(err);
  }
}));
passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(function(username, done) {
  const userDetails = users.find(u => u.username == username);
  if (!userDetails) {
    done(null, false);
  }
  const {password, ...user} = userDetails;
  //if there is a DB error
  // done(err);
  done(null, user);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'b76903af-3f6b-4e4a-8d09-6a01ef2cfa87'})); // Secret or key should be store as environment variables
app.use(passport.initialize());
app.use(passport.session());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', authHandler);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', {layout: false});
});

module.exports = app;
