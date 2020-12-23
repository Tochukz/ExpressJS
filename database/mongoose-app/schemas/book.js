const  mongoose, { Schema, Types } = require('mongoose');

const bookSchema = new Schema({
  title: String,
  author: String,
  price: Number,
  subcategoryId: Types.ObjectId,
  details: {
    description: String,
    language: String,
    pages: Number,
    edition: String
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  dates: {
    created: Date,
    updated: Date,
    deleted: Date,
  }
});

/** Adding instance method to the model */
bookSchema.methods.findSimilar = function(callBack) {
  return mongoose.models('Book').find({subcategoryId: this.subcategoryId}, callBack);
};

/** Adding static method to the model */
bookSchema.statics.findSimilarTitle = function(title) {
  return this.find({title: new RegExp(title, 'i')});
}

/** Adding query helper to the model */
bookSchema.query.byAuthor = function(author) {
  return this.where({author: new RegExp(author, 'i')});
}
module.exports = bookSchema;
