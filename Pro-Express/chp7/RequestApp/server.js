const path = require('path');
const util = require('util');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const debug = require('debug')('request');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json({strict: true}));
//app.use(cookieParser());
app.use(cookieParser('hbjdhbadjdgj347na83n9n'));


/* Using req.query object */
app.get('/search', (req, res) => {
  res.end(JSON.stringify(req.query) + '\r\n');
});

/* Using req.params object */
app.get('/param/:name/:role', (req, res) => {
  res.end(JSON.stringify(req.params));
});

/* Using req.body */
app.post('/body', (req, res) => {
  res.end(JSON.stringify(req.body));
});

/* Using req.route */
app.get('/users/:id', (req, res) => {
  // req.route contains path, stack.method and methods properties. 
  res.send(req.route);
});

/* Using req.cookies and req.cookie() */
app.get('/cookie', (req, res) => {
  if (!req.cookies.counter) {
      res.cookie('counter', 0);
  } else {
    // Using parseInt() with the radix/base (second argument) is recommended to prevent numbers from being converted incorrectly.
      res.cookie('counter', parseInt(req.cookies.counter , 10) +1);
  }
  res.status(200).send(`Cookies are: ${JSON.stringify(req.cookies)}`);
});

/* Using req.signedCookies */
app.get('/signed-cookie', (req, res) => {
  if (!req.signedCookies.number) {
      res.cookie('number', 0, {signed: true});
  } else {
      res.cookie('number', parseInt(req.signedCookies.number, 10) + 1, {signed: true});
  }
  res.status(200).send(`Cookies are: ${JSON.stringify(req.signedCookies)}`);
});

/* Use req.header() or req.get() for retrieving HTTP header */
app.post('/headers', (req, res) => {
  const headers = {
      'header1': req.get('content-type'),
      'header2': req.header('accept')
  }
  res.json(headers);
});

/* catch 404 and forward to eror handler  */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

/*** Error Handlers **/
/* Development error handler. Will print stacktrace*/
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { 
        console.log(util.inspect(err));
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

console.log('env = ', app.get('env'));

/* Production error handler. No stacktrace leaded to user */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: ''
  })
})


app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), () => {
    debug(`Server is running on port ${app.get('port')}`);
});