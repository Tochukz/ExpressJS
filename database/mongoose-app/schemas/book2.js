const  mongoose = require('../database/mongoose');

const { Schema, Types } = mongoose;

class Book {
    findSimilarSubcategory(callBack) {
        //Todo: To be tested
        return mongoose.model('Book').find({subcategoryId: this.subcategoryId}, callBack);
    };
      
      /** Adding static method to the model */
    static findSimilarTitle(title) {
         //Todo: To be tested
        return  mongoose.model('Book').find({title: new RegExp(title, 'i')});
    }
      
    static byAuthor(author) {
        return this.find({author: new RegExp(author, 'i')});
    }
      

    // A virtual property
    get titleAndSubCategory() {
        return this.title + " Unkonw SubCategory ";
    }
}

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


/** Adding query helper to the model */
bookSchema.query.byAuthor = function(author) {
  return this.where({author: new RegExp(author, 'i')});
}

bookSchema.loadClass(Book);
module.exports = bookSchema;

