var express = require('express');
var router = express.Router();

const { User } = require('../models');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch(err) {
    return next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userId: req.params.userId}});
    return res.json(user);
  } catch(err) { 
    return next(err);
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const data = req.body;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch(err) {
    return next(err);
  }  
});

router.put('/update', async (req, res, next) => {
  try {
    const {userId, ...data} = req.body;
    data.updatedAt = new Date();
    await User.update(data, {where: { userId }});
    const user = await User.findOne({ where: { userId }});
    return res.status(201).json(user);
  } catch (err) { 
    return next(err);
  }
})

router.delete('/delete/:userId', async (req, res, next) =>{
  try {
    const result = await User.destroy({ where: { userId: req.params.userId }});
    return res.status(204).json({});
  } catch(err) {
    return next(err);
  }
})
module.exports = router;
