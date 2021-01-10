var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../data/users');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  const user = req.user;
  user.time = new Date().toISOString();
  return res.send(user);
});

router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  const user = users.find(usr => usr.username == username);
  if (!user) {
    return res.send({message: `User ${username} does not exist`}, 401);
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.send({message: 'Invalid username and/or password.'}, 401);
  }
  const payload = {userId: user.userId, username: user.username};
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret);
  return res.json({ token });
});

router.post('/register', async (req, res, next) => {
  const {username, password} = req.body;
  const exitingUser = users.find(usr => usr.username == username);
  if (exitingUser) {
    return res.send({message: `User with username ${username} already exits`}, 400);
  }
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  const userId = users.length + 1;
  const newUser = {
    userId,
    username,
    password: hashedPassword
  };
  users.push(newUser);
  res.send({userId, username});
});

module.exports = router;
