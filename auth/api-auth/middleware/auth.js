const passport = require('passport');
const { UniqueTokenStrategy } = require('passport-unique-token');
const users = require('../data/users');

const stategyOptions = {tokenHeader: 'x-client-token'}; 
passport.use(new UniqueTokenStrategy(stategyOptions, (token, done) => {
  try {
    const user = users.find(usr => usr.token === token);
    if (user) { 
      return done(null, user);
    } 
     return done(null, false);
    
  } catch(err) {
    // Server/DB error
    done(err);
  }
}));

module.exports = function(req, res, next) {  
  const path = req.path.toLowerCase();
  if (path === '/login' || path === '/logout') {
    return next();
  }

  passport.authenticate('token', (err, user, info) => {
    if (info && info.message.toLowerCase() == 'missing credentials') {
       return res.status(403).json({message: 'Not Allowed'});
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({messgae: 'Invalid token!'});
    }
    req.user = user;
    return next();
  })(req, res, next);
}