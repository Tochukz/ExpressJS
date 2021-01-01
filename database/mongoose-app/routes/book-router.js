var express = require('express');
const { isValidObjectId, Types } = require('mongoose');
const Book = require('../models/Book');

var router = express.Router();

router.get('', async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.get('/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    if (bookId.length !=24 || !isValidObjectId(bookId)) {
      return next(new Error("Invalid book ID"));
    }
    const bookObjectId = Types.ObjectId(bookId);
    const book = await Book.findOne({ _id: bookObjectId});
    return res.send(book);
  } catch(err) {
    return next(err);
  }
});

/** Todo: Work on the underlying model instance method */
router.get('/like/:bookTitle', async (req, res, next) => {
  try {
    const title = req.params.bookTitle;
    const book = await Book.findOne({ title });
    let similarBooks = {};
    if (book) {
      similarBooks = await book.findSimilar();
    }
    return res.send({book, similarBooks});
  } catch(err) {
    return next(err);
  }
});

router.get('/by/:author', async (req, res, next) => {
  try {
    const author = req.params.author;
    const book = await Book.byAuthor(author).exec()
    return res.send(book);
  } catch(err) {
    return next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newData  = req.body;
    const newBook = new Book(newData)
    const result = await newBook.save();
    res.status(201).send(result);
  } catch(err) {
    return next(err);
  }
});


module.exports = router;
