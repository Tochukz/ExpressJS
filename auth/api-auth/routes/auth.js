var express = require('express');
var router = express.Router();

const users = require('../data/users');

router.post('/login', (req, res, next) => {
    let {username, password} = req.body;
    username = username || "empty";
    const user = users.find(usr => usr.username.toLowerCase() == username.toLowerCase() && password == usr.password);
    if (!user) {
        return res.status(401).send({message: 'Invalid username and/or password'});   
    }
    return res.send({
        token: user.token,
    });
});

router.post('/logout',  (req, res, next) => {
    return res.send({message: 'Logout Successful'});
}); 

module.exports = router;