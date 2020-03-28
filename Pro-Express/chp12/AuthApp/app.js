const path = require('path');
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis')(session);
require('dotenv').config();

const Auth = require('./auth');

const app = express();
const redisClient = redis.createClient();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json({strict: true}));
app.use(session({
    key: 'user',
    resave: true,
    saveUninitialized: true,
    store: new connectRedis({client: redisClient}),
    secret: 'b76903af-3f6b-4e4a-8d09-6a01ef2cfa87',
    unset: 'destroy',
    rolling: true,
    cookie: {
        maxAge: 3600000
    }
}));
/* Auth Middleware */
app.use(Auth);

/** Routes */
app.get('/', (req, res) => {
   res.render('index',  {username: req.session.auth.user.name});
});

app.get('/admin', (req, res) => {
  res.render('admin', {username: req.session.auth.user.name});
});



const server = app.listen(process.env.PORT || 9000, () => console.log(`Server running at ${server.address().port}`) )