const  mongoose = require('../database/mongoose');

const { Schema, Types } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    price: Number,
    subCatId: {
      type: Types.ObjectId,
      alias: 'subcategoryId'
    },
    details: {
      description: String,
      language: String,
      pages: Number,
      edition: String
    },
    isbn: {
      type: String,
    },
    entryDate: {
      type: Date,
      default: Date.now
    },
    dates: {
      created: Date,
      updated: Date,
      deleted: Date,
    },
  },
  {autoIndex: false}
);

/**  Setting index is fine in development but haveb significant performance imapct in productionl */
//bookSchema.set('autoIndex', false)
// autoIndex can also be set in ducing the schema defition as seen above or globally in the connect method.

/** Adding instance method to the model */
bookSchema.methods.findSimilar = function(callBack) {
  return mongoose.models('Book').find({subcategoryId: this.subcategoryId}, callBack);
};

/** Adding static method to the model */
bookSchema.statics.findSimilarTitle = function(title) {
  return this.find({title: new RegExp(title, 'i')});
}
bookSchema.statics.byAuthor = function(author) {
  return this.find({author: new RegExp(author, 'i')});
}

bookSchema.statics.findSimilarTitleAsyc = async function() {
  const title = this.title; 
  return await this.find({title: new RegExp(title, 'i')});
}


/** Adding query helper to the model */
bookSchema.query.byAuthor = function(author) {
  return this.where({author: new RegExp(author, 'i')});
}
module.exports = bookSchema;


/**
Do not declare methods for your model using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.
Query helper methods let you extend mongoose's chainable query builder API.
*/