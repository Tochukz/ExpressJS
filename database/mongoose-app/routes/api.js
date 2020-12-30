var express = require('express');
const Book = require('../models/Book');

var router = express.Router();

router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find();
    return res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.get('/books/like/:bookTitle', async (req, res, next) => {
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

router.get('/books/by/:author', async (req, res, next) => {
  try {
    const author = req.params.author;
    const book = await Book.byAuthor(author).exec()
    return res.send(book);
  } catch(err) {
    return next(err);
  }
});

router.post('/books/create', async (req, res, next) => {
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
