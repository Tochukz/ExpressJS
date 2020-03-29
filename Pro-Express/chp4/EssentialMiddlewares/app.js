const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const Cryptr = require('cryptr');

require('dotenv').config();

const app = express();
const cryptr = new Cryptr(process.env.COOKIE_ENCRYPTION_KEY);

const users = require('./data/users');

/*** Settings **/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*** Middlewares **/
/* Parse cookies */
app.use(cookieParser(process.env.COOKIE_PARSER_KEY));

/* Server static pages */
app.use(express.static(path.join(__dirname, 'public')));

/* compresses response data. threshold = min size in kilobits to apply compression */
app.use(compression({threshold: 1})); 

/* Can be used to create access logs. see the start script in package.json */
app.use(morgan('combined'));

/* Parses JSON string request body */
app.use(express.json({strict: true})); // For POST with JSON body

/* Parse  x-www-form-urlencoded  form data */
app.use(express.urlencoded({extended: false}));

/* Setting a cookie*/
app.use('/login', (req, res, next) => {
    const username =  req.body.username
    if (req.method == 'POST' && !req.cookies['user'] && username) {
        // None-Encoded Cooke
        res.cookie('user', {username, cookieID: uuid.v4()}, { maxAge: 900000, httpOnly: true }); //maxAge in millisecs so 1 day cookie=1000x60X60x24.  For https onle add {secure: true}
        // Encoded Cookie
        res.cookie('encodedUser',  {username, cookieID: uuid.v4()}, { maxAge: 900000, httpOnly: true, encode: (cookie) => {
                    return cryptr.encrypt(cookie);
                  }
        })
        res.redirect('/admin');
    } else {
        res.redirect('/');
    }
    next();
});

/* Destroy cookie */
app.use('/logout', (req, res, next) => {
  if (req.method == 'POST') {
      res.clearCookie('user');
      res.clearCookie('encodedUser');
      res.redirect('/');
  }
  next();
});

/*** Routes **/
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/user', (req, res) => {
    res.json(req.body);
});

app.get('/user', (req, res) => {
  const user = users.find(u => u.name.toLowerCase() == req.query.name) || {};
  res.json(user);
});

app.get('/cookies', (req, res) => {
  const user = req.cookies['user'];
  const encodedUser = req.cookies['encodedUser'];
  let resolved =  { user }
  if (encodedUser) {
     resolved.encodedUser = cryptr.decrypt(encodedUser); // "j:{\"username\":\"Peter\",\"cookieID\":\"bd45d17d-48df-4800-95d7-4bb4a7f84d1b\"}"
  }
 
  //res.json(req.cookies);
  res.json(resolved);
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

const server = app.listen(9000, () => console.log(`Server is running with ${server.address().port}`));