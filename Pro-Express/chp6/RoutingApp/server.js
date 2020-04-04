const path = require('path');
const express = require('express');
const tool = require('./router/tool');

const user = require('./models/user');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({strict: true}));
app.use('/tool', tool);

/** Parameter middlewares */
/* Will be triggered when request url match parameter. 
 * Best used when more than one route has the given parameter. 
 */
app.param('username', (req, res, next, username) => {
  console.log('req contains :username param');
  user.findUserByUsername(username, (error, user) => {
     if (error) {
         return next(error);
     }   
     req.user = user;
     return next();
  });
});

app.param('id', (req, res, next, id) => {
  user.findUserById(id, (error, user) => {
      if (error) {
          return next(error);
      }
      req.user = user;
      return next();
  });
});


/** Routes */
app.get('/users/:username',  (req, res) => {
    return res.render('user', req.user);
});

app.get('/user/:id', (req, res) => {
    return res.render('user', req.user);
});
const server = app.listen(9000, () => console.log(`Server running at ${server.address().port}`));