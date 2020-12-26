var express = require('express');
var router = express.Router();

const { Category, Subcategory, Book } = require('../models');
console.log('Category', Category);

/* GET users listing. */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll({include: [{model: Subcategory, as: 'Subcategories'}]});
    const sub = await categories[0].getSubcategories();
    console.log('sub', sub);
    res.send(categories);
  } catch(err) {
    return next(err);
  }
});

router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({ where: { categoryId }, include: [{model: Subcategory, as: 'Subcategories'}]});
    res.send(category);
  } catch(err) {
    return next(err);
  }
});

router.get('/subcategories', async (req, res, next) => {
  try {
    const subcategories = await Subcategory.findAll({include: [{model: Category, as: 'Category'}, {model: Book, as: 'Books'}]});
    res.send(subcategories);
  } catch(err) {
    return next(err);
  }
});

router.get('/subcategories/:subcategoryId', async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategories = await Subcategory.findAll({where: { subcategoryId }, include: [{model: Category, as: 'Category'}, {model: Book, as: 'Books'}]});
    res.send(subcategories);
  } catch(err) {
    return next(err);
  }
});

router.get('/books', async (req, res, next) => {
  try {
    const books = await Book.findAll({include: [{model: Subcategory, as: 'Subcategory'}]});
    res.send(books);
  } catch(err) {
    return next(err);
  }
});

router.get('/books/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findOne({where: { bookId }, include: [{model: Subcategory, as: 'Subcategory'}]});
    res.send(books);
  } catch(err) {
    return next(err);
  }
});

module.exports = router;
