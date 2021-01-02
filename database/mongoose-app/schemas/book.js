const  mongoose = require('../database/mongoose');

const { Schema, Types } = mongoose;

const bookSchema = new Schema(
  {
    title: { 
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subCatId: {
      type: Types.ObjectId,
      alias: 'subcategoryId',
      required: true,
    },
    details: {
      edition: String,
      description: { 
        type: String,
        require: true,
      },
      language: String,
      pages: Number,
      coverImage: String
    }, 
    entryDate: {
      type: Date,
      default: Date.now
    },
  },
  {
    autoIndex: false,
    timestamps: true
  }
);

/**  Setting index is fine in development but haveb significant performance imapct in productionl */
//bookSchema.set('autoIndex', false)
// autoIndex can also be set in ducing the schema defition as seen above or globally in the connect method.

/** Adding instance method to the model */
bookSchema.methods.findSimilarSubcategory = function(callBack) {
  return mongoose.model('Book').find({subcategoryId: this.subcategoryId}, callBack);
};

/** Adding static method to the model */
bookSchema.statics.findSimilarTitle = function() {
  const docId = new Types.ObjectId(this._id);
  return mongoose.model('Book').find({_id: {$ne: this._id}, title: new RegExp(this.title, 'i')});
}

bookSchema.statics.byAuthor = function(author) {
  return this.find({author: new RegExp(author, 'i')});
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