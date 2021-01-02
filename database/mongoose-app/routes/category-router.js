const router = require('express').Router();

const { isValidObjectId, Types } = require('mongoose');

const Category = require('../models/Category'); 

router.get('', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch(err) {
    return next(err);
  }
});

router.get('/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    if (categoryId.length != 24 || !isValidObjectId(categoryId)) {
      return next(new Error("Invalid Category ID"));
    }
    const catObjectId = new Types.ObjectId(categoryId);
    const category = await Category.findOne({ _id: catObjectId});
    return res.json(category);
  } catch(err) {
    return next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const categoryData = req.body;       
    const newCategory = new Category(categoryData);
    const category = await newCategory.save();
    return res.status(201).json(category);
  } catch(err) {
    return next(err);
  }
});

router.put('/update', async(req, res, next) => {
  try {
    const {_id, ...categoryData} = req.body;  
    const catObjectId = new Types.ObjectId(_id);
    const result = await Category.updateOne({_id: catObjectId}, {...categoryData});
    let updatedData = {};
    if (result.ok || result.nModified) {
      updatedData = await Category.findOne({_id: catObjectId});
    }
    return res.status(201).send(updatedData);
  } catch(err) {
    return next(err);
  }
});

module.exports = router;