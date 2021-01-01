const mongoose = require('../database/mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { 
      type: String,
      unique: true,
      required: true,
    },  
  },
  {
    timestamps: true
  }
);

module.exports = categorySchema;