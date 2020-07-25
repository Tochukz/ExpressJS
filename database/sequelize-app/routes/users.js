const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch(err) {
    return next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { userId }})
    return res.send(user);
  } catch(err) {
    return next(err);
  }
});

module.exports  = router;