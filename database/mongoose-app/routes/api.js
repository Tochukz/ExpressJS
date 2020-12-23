var express = require('express');
const Book = require('../models/Book');

var router = express.Router();

/* GET users listing. */
router.get('/books', (req, res, next) => {
  
});

router.get('/books/like/:bookTitle', (req, res, next) => {
  Book.
})

module.exports = router;
