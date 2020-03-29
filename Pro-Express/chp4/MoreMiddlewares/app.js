const fs = require('fs');
const path = require('path');
const url = require('url');

const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const timeout = require('connect-timeout');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const responseTime = require('response-time');
const serveFavicon = require('serve-favicon');
const serveIndex = require('serve-index');

require('dotenv').config();

const { findUserByCred, findUserById, updateUser, usersInfo} = require('./db/finduser');

const app = express();

/*** Settings **/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*** Middlewares **/
/* For directory listing */
app.use('/shared', serveIndex(path.join('public', 'shared'), {icons: true, view: 'details'})); // view: [tiles|details]

/** server static file and assets */
app.use(express.static(path.join(__dirname, 'public')));

/* POST Form  body parssr*/
app.use(express.urlencoded({extended: false}));

/* POST JSOON body parser */
app.use(express.json({strict: true}));

/* session define a session */
/* Here the store option was not set. By default the MemoryStore will be used.
 * In production, a persistent database server such as Redis must be used for the session store  */
app.use(session({
    key: 'user',
    resave: true,
    saveUninitialized: true,
    unset: 'destroy',
    rolling: true,
    secret: 'b76903af-3f6b-4e4a-8d09-6a01ef2cfa87',
    cookie: {
        maxAge: 60000
    }
}));

/* Cross Site Request Forgery(CSRF) protection */
app.use(csurf());
/* Handle CSRF error. Has been moved to the error handling section */
// app.use((err, req, res, next) => {
//   if(err.code !== 'EBADCSRFTOKEN') {
//     return  next(err);
//   }
//   res.status(403).render('errors/csrf403');
// });

/* To timeout potential slow pages */
app.use('/slow', timeout('5s'));

/* Error handling middleware for dev environment */
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv && nodeEnv.trim() != 'production') {
    console.log('Environment = ', process.env.NODE_ENV);
    app.use(errorHandler());
}
/* Provide support for client such as browsers that dont support HTTP methods like DELETE, PUT, OPTION*/
/* Uses  X-HTTP-Method-Override header to transform request method from POST to the value of the header  */
app.use(methodOverride('X-HTTP-Method-Override'));

/* Uses form field with name '_method' to transfrom request method */
app.use(methodOverride('_method'));

/* To serve favicon. Not working at the moment*/
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));

/* Adds X-Response-Time header to responses */
app.use(responseTime());


/*** Routes **/
/** Tests the session */
app.get('/', (req, res) => {
    console.log('Session ID', req.sessionID);
    if (req.session.counter) {
        req.session.counter += 1;
    } else {
        req.session.counter = 1;
    }
    res.send(`Counter: ${req.session.counter}`);
});

/* Test CSRF Protection for Form POST*/
app.post('/csrf-test', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = findUserByCred(username, password);
  
    if (user) {
        const  data = {header: `Welcome ${user.name} `, content: 'Admin page for the site adminstrator'}
        res.render('admin', data);
    } else {
        const error =  {error: 'Username and/or password is incorrect'};
        res.redirect(url.format({pathname: '/csrf-form-test', query: error}));
    }
});

/* Test CSRF Protection for AJAX request */
app.post('/api/csrf-test', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = findUserByCred(username, password);
  
    if (user) {
        const  data = {header: `Welcome ${user.name} `, content: 'Admin page for the site adminstrator'}
        res.json(data);
    } else {
        const error =  {error: 'Username and/or password is incorrect'};
        res.status(404).json(error);
    } 
});

/* Test CSRF Protetion using traditional forms */
app.get('/csrf-form-test', (req, res) => {
    const error = req.query.error;
    res.render('csrf-form', {csrfToken: req.csrfToken(), error});
});

/* Test CSRF protection using Fetch API */
app.get('/csrf-fetch-test', (req, res) => {
   res.render('csrf-fetch', {csrfToken: req.csrfToken()});
});

/* connection-timeout test */
app.get('/slow/page', (req, res) => {
  setTimeout(() => {
    if (!req.timedout) {
        res.send("Ok");
    }
  }, 10000 * Math.round(Math.random()))
});

/** Syncronous error testing for Custom Error Handling in production mode*/
app.get('/error/:errno', (req, res, next) => {
  const erroNo = req.params.errno;
  switch(erroNo) {
      case '404': 
       res.status(404);
       throw new Error('Not Found');
       break;
      case '503': 
        res.status(503);
        throw new Error('Server Unavailable');
        break;
      case '403':
        res.status(403);
        throw new Error('Forbidden');        
        break;
      default:
        res.status(500)
        throw new Error('Server Error')
  }
});

/** Asynchronous Error test for custom error handling in production mode*/
app.get('/falsefile', (req, res, next) => {
  fs.readFile('falsefile.text', (err, data) => {
     if(err) {
        res.status(500);
        next(err);
     }
  })
});

/* Asycnrounous operation in route */
app.get('/realfile', (req, res, next) => {
    fs.readFile('file.text', (err, data) => {
        if(err) {
            res.status(500);
            next(err);
        }
        res.send(data);
    })
});

app.get('/users', (req, res, next) => {
  const error = req.query.error;
  res.render('users', { usersInfo: usersInfo(), csrfToken: req.csrfToken(), error });
});

app.put('/users', (req, res) => {
  const {id, name, city }  = req.body;
  const user = findUserById(id);
  let error = undefined
  if (user) {
    updateUser(user, {id, name, city});
  } else {
      error =  `User with ID ${id} was not found`;
  }
  res.redirect(url.format({pathname: '/users', query: {error}}));
});

app.put('/api/users', (req, res) => {
    const {id, name, city }  = req.body;
    const user = findUserById(id);
    let error = undefined
    if (user) {
        updateUser(user, {id, name, city});
        res.json(user);
    } else {
        error =  `User with ID ${id} was not found`;
        res.json({error})
    }
});


app.get('/response-time', (req, res) => {
  setTimeout(() => {
    res.send('Ok');
  }, 758)
});

/** 404 NotFound */
app.all('*', (req, res, next) => {
  console.log(`Method is ${req.method}`);
//   res.status(404);
//   throw new Error('Not Found');
});


/*** Actual Error Handler **/
if (nodeEnv && nodeEnv.trim() == 'production') {
    console.log('On Production');
    app.use((err, req, res, next) => {
        const status = err.status || res.statusCode  || 500;

        console.log('res.statusCode', res.statusCode);
        console.log('error ', err);
        console.log('error.status: ', err.status);
        console.log('status ', status);
        console.log('type: ', typeof status);

        res.status(status);
        switch(status) {
            case 404: 
             res.render('errors/404');
             break;
            case 403: 
               if(err.code == 'EBADCSRFTOKEN') {
                  // For 403 thrown by the csurf CSRF middleware
                  res.status(403).render('errors/csrf403');                    
               } else {
                  res.render('errors/403')
               }                
             break;
            case 503:
             res.render('errors/503');
             break;
            default: 
             res.render('errors/500');
        }
    });
}

const server = app.listen(process.env.PORT || 9000, () => console.log(`Server running at ${server.address().port}`) )