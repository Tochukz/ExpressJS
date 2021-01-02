var express = require('express');
var router = express.Router();

const users = require('../data/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const userList = users.map(usr => ({name: usr.name}));
  res.send(userList);
});


module.exports = router;
