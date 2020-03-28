
const users =  require('../db/users');

function Auth(req, res, next) {
    const methodPath = `${req.method}${req.path.toLowerCase()}`;
    switch(methodPath) {
        case 'GET/login':
         loginGet(req, res);
         break;
        case 'POST/login':
         loginPost(req, res)
         break;
        case 'GET/register':
          registerGet(req, res);
          break;
        case 'POST/register': 
          registerPost(req, res);
          break;
        case 'POST/logout':
          logoutPost(req, res);
          break;
        default: 
          handleAuth(req, res, next); 
    }
}

const loginGet = function(req, res) {
    return res.render('login');
};

const loginPost = function(req, res) {
    if (req.session.auth) {
        return res.redirect('/admin');
    }
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = users.find(user => user.username == username && user.password === password);
    if (existingUser) {
        req.session.auth = {user: {name: existingUser.name}}
        return res.redirect('/')
    } else {
       return res.render('login', {error: 'Username and/or password not correct!'})
    }
};

const registerGet = function(req, res) {
   return  res.render('register');
};

const registerPost = function(req, res) {
    const body = req.body;
    const user = {
       name: body.name,
       username: body.username,
       password:body.password
    }
    users.push(user);
    return res.redirect('/login');
};

const logoutPost = function (req, res) {
  req.session.destroy(() => {
    res.clearCookie('user');
    res.redirect('/login')
  });
};

const handleAuth = function(req, res, next) {
    if (req.session && req.session.auth) {
        return next();
    } else {
        return res.redirect('/login');
     }
};

module.exports = Auth;