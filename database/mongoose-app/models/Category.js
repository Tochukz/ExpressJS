const mongoose = require('../database/mongoose');
const categorySchema = require('../schemas/category');

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;