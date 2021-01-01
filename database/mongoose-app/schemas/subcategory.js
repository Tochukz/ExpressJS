const mongoose = require('../database/mongoose');

const { Schema, Types } = mongoose;

const subCategorySchema = new Schema(
  {
    catId: {
      type: Types.ObjectId,
      alias: 'categoryId',
      required: true,
    },
    name: { 
      type: String,
      unique: true,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = subCategorySchema;