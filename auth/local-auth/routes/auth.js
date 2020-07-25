module.exports = function(req, res, next) {
    if (req.path.toLowerCase() == '/login') {        
        return next();
    } else if(!req.user) {        
        return res.redirect('/login');
    } else {           
        res.locals = { user: req.user};
        return next();
    }
}