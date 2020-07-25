const { Model, STRING, TEXT, INTEGER, FLOAT, DATE} = require('sequelize');
const sequelize = require('../db/sequelize');

class Book extends Model {}

Book.init({
  bookId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  author: {
    type: STRING,
    allowNull: false,
  },
  edition: {
    type: STRING,
  },
  price: {
    type: FLOAT,
    allowNull: false,
  },
  img: {
    type: STRING,
    allowNull: false,
  },
  availability: {
    type: INTEGER,
    allowNull: false,
  },
  details: {
    type: TEXT,
    allowNull: false,
  },
  pages: {
    type: INTEGER,
    allowNull: false,
  },
  language: {
    type: STRING,
    allowNull: false,
  },
  categoryId: {
    type: INTEGER,
    allowNull: false,
  },
  subcategoryId: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE, 
  },
  updatedAt: {
    type: DATE,
  },
  deletedAt: {
    type: DATE,
  }
}, {
  sequelize,
  modelName: 'book',
  // options
});

module.exports = Book;