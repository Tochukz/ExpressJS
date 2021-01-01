const mongoose = require('../database/mongoose');
const subCategorySchema = require('../schemas/subcategory');

const Subcategory = mongoose.model('Subcategory', subCategorySchema);

module.exports = Subcategory;