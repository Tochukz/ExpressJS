var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h3>SQLite DB with Sequelize ORM</h3>');
});

module.exports = router;
