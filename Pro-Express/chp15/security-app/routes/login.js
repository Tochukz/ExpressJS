const express = require('express');
const createError = require('http-errors');
const { check, validationErrors, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({min: 5})
], (req, res, next) => {
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({errors: errors.array()});
  }
  const email = req.body.email;
  res.render('admin', { email })
});

module.exports = router;