const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const users = {
    'chucks': {
        username: 'Tochukz',
        email: 'true@gmail.com',
        website: 'http://tochukwu.xyz',
        blog: 'http://tochukwu.co.za'
    }
}

const findUserByUsername = function(username, callback) {
  if(!users[username]) {
      return callback(new Error(`No user matching ${username}`));
  }
  return callback(null, users[username]);
}

const findUserByUsernameMiddleware = function(req, res, next) {
    const username = req.params.username;
    if(username) {
        findUserByUsername(username, (error, user) => {
           if (error) {
               return next(error);
           } 
           req.user = user;
           return next();
        });
    } else {
        return next();
    }
}

const auth = function(req, res, next) {
    // check for active session or req obj for login cred
    console.log('Session active');
    findUserByUsername(req.params.username, (error, user) => {
        if (error) {
           return next(error);
        }
        req.user = user;
        return next();
    });  
}

const getMetrics = function(req, rres, next) {
    // Get metrics from database
    const metrics = {
        sales: 'R59,000',
        growth: '29%',
        satisfaction: '78%'
    };
    req.metrics = metrics;
    return next();
}

const renderAdmin = function(req, res) {
    res.render('admin', {user: req.user, metrics: req.metrics});
}

const adminHandler = [auth, getMetrics, renderAdmin];

app.get('/v1/users/:username', findUserByUsernameMiddleware,  (req, res, next) => {
    return res.render('user', req.user);
});

app.get('/v1/admin/:username', adminHandler);


const server = app.listen(9000, () => console.log(`Server running at ${server.address().port}`));