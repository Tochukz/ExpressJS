var express = require('express');
var router = express.Router();
const { Staff, User } = require('../models');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const results = await Staff.findAll({include: { model: User, as: 'user'}}); 
  return res.json(results);
});

router.put('/update', async (req, res, next) => {
  try {
    const {staffId, ...data} = req.body;
    // data.updatedAt = new Date();
    await Staff.update(data, {where: { staffId }});
    const staff = await Staff.findOne({ where: { staffId }});
    return res.status(201).json(staff);
  } catch (err) { 
    return next(err);
  }
})
module.exports = router;
