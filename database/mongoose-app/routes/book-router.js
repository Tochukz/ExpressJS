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

router.get('/like/:bookTitle', async (req, res, next) => {
  try {
    const title = req.params.bookTitle;
    const book = await Book.findOne({ title });
    let similarBooks = {};
    if (book) {
      //similarBooks = await book.findSimilarSubcategory();
      similarBooks = await Book.findSimilarTitle();
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

router.put('/update', async (req, res, next) => {
  try {
    const {_id, ...bookData} = req.body;
    if (_id.length != 24 || !isValidObjectId(_id)) {
      return next(new Error('Invalid Book ID'));
    }
    const flattened = flatten(bookData);
    const bookObjectId = new Types.ObjectId(_id);   
    const result = await Book.updateOne({_id: bookObjectId},  {$set: flattened});
    let updatedBook = {}
    if (result.ok || result.nModified) {
      updatedBook = await Book.findOne({_id: bookObjectId});
    }

    return res.status(201).json(updatedBook);
  } catch(err) {
    return next(err);
  }
});

function flatten(obj) {
  const newObj = {};
  for(prop in obj) {
    if (typeof obj[prop] == 'object' && !Array.isArray(obj[prop])) {
      for(innerProp in obj[prop]) {
        const newKey = `${prop}.${innerProp}`; 
        newObj[newKey] = obj[prop][innerProp];
      }
    } else {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

module.exports = router;
