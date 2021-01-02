const router = require('express').Router();

const { isValidObjectId, Types } = require('mongoose');
const Subcategory = require('../models/Subcategory');

router.get('', async (req, res, next) => {
  try {
    const subcategories = await Subcategory.find();
    return res.json(subcategories);
  } catch(err) {
    return next(err);
  }
});

router.get('/:subcategoryId', async(req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    if (subcategoryId.length != 24 || !isValidObjectId(subcategoryId)) {
      return next( new Error("Invalid Subcategory ID"));
    }
    const subcatObjectId = new Types.ObjectId(subcategoryId);
    const subcategory = await Subcategory.findOne({_id: subcatObjectId});
    return res.json(subcategory);
  } catch(err) {
    return next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const subcategoryData = req.body;
    const newSubcategory = new Subcategory(subcategoryData);
    const subcategory = await newSubcategory.save();
    return res.status(201).json(subcategory);
  } catch(err) {
    return next(err);
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const {_id, ...subCategoryData} = req.body;
    if (_id.length != 24 || ! isValidObjectId(_id)) {
      return next(new Error("Invalid Subcategory ID"));
    }
    const subCatObjectId = Types.ObjectId(_id);
    const result = await Subcategory.updateOne({_id: subCatObjectId}, {...subCategoryData});
    let updatedData = {};
    if (result.ok || result.nModified) {
        updatedData = await Subcategory.findOne({_id: subCatObjectId});
    }
    return res.status(201).json(updatedData);
  } catch(err) {
    return next(err);
  }
});
module.exports = router;