'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Book.belongsTo(models.Subcategory, {foreignKey: 'subcategoryId', sourceKey: 'subcategoryId'})
    }
  };
  Book.init({
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    edition: DataTypes.STRING,
    price: DataTypes.FLOAT,
    img: DataTypes.STRING,
    availability: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    subcategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
 
  return Book;
};