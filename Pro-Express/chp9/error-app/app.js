const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const errorhandler = require('errorhandler');


const app = express();

/** Settings */
app.set('PORT', 9000);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 2);
/** Middlewares  */
app.use(morgan('dev'));

/** Use app.locals to set app-wide settings such as location. URLS, contact info etc
 *  unlike res.locals that is specific to a given request, app.local is available for all requests
*/
app.locals = {lang: 'en', 'appName': 'HackHall'};

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/app-locals', (req, res) => {
  res.send(app.locals);
});

app.get('/admin', (req, res, next) => {
  // custom 403
  const err = new Error("You don't velone here");
  err.status = 403
  next(err);
});

app.get('/dashboard', (req, res, next) => {
  // make 401 error
  const err = new Error("You are not authorized");
  err.status = 401
  next(err);
});

app.get('/server-error', (req, res, next) => {
  const file = fs.readFile('fake/path/to/file.lost', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});


/** Catch all 404 errors */
app.get('*', (req, res) => {
  res.render('404');
});




/** Error Handler */
if (app.get('env').trim() == 'development') {
  app.use(errorhandler());
} else if(app.get('env').trim() == 'production') {
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    console.log('production error', status);
    switch(status) {
      case 401:
        return res.render('401');
      case 403:
        return res.render('403');
      default:
        return res.render('500');
    }
  });
}

module.exports = app;
