'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Subcategory.belongsTo(models.Category, {foreignKey: 'categoryId', sourceKey: 'categoryId'});
      models.Subcategory.hasMany(models.Book, {as: 'Books', foreignKey: 'subcategoryId', sourceKey: 'subcategoryId'});
    }
  };
  Subcategory.init({
    subcategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subcategory',
  });
  return Subcategory;
};