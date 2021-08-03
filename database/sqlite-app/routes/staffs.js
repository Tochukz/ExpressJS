var express = require('express');
var router = express.Router();
const { Staff } = require('../models');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const results = await Staff.findAll(); 
  return res.json(results);
});

module.exports = router;
