var express = require('express');
var router = express.Router();

const db = require('../db/sequelize');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', (req, res, next) => {
  db.authenticate()
    .then(response => {
      return res.send(response || "Database connection successful");
    })
    .catch(err => next(err));
});
module.exports = router;
