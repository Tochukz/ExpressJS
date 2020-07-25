var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Express' });
});

router.get('/modules', function(req, res, next) {
  return res.render('modules', { title: 'Modules' });
});

router.get('/login', (req, res, next) => {
  const message = req.query.message;
  return res.render('login', {layout: false, message});
});

router.get('/logout', (req, res, next) => {
  req.logout();
  return res.redirect('/login');
});

router.post('/login', (req, res, next) => {
  const { username, password} = req.body;
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(`/login?message=${info.message}`);
    }
    // Call req.logIn() to establish a session
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
