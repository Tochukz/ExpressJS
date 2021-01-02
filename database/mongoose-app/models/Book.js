const mongoose = require('mongoose');

const bookSchema = require('../schemas/book');
//const bookSchema = require('../schemas/book2');
  
const Book = mongoose.model('Book', bookSchema);


module.exports = Book;