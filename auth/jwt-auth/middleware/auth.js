const jwt = require('jsonwebtoken');
//const users = require('../data/users');

module.exports = function(req, res, next) {
    const path = req.path.toLowerCase();
    console.log('path', path);
    if (path == '/users/login' || path == '/users/register') {
      return next();
    }
    
    try {
        const authorization = req.header('authorization');
        if (!authorization) {
          return res.json({message: 'Missing authorization token'}, 403)
        }
        console.log('auth', authorization);
        const token = authorization.split(' ')[1];
        const secret = process.env.SECRET;
        const user = jwt.verify(token, secret);
        req.user = {userId: user.userId, username: user.username};
        return next();
    } catch(err) {
        return next(err);
    }
}