var express = require('express');
var router = express.Router();

const Book = require('../models/Book');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll();
    return res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.get('/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOne({where: { bookId }})
    return res.send(book);
  } catch(err) {
    return next(err);
  }
});
module.exports = router;
