'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      models.Staff.hasOne(models.User, {foreignKey: 'staffId', sourceKey: 'staffId', as: 'user'});
    }
  };
  Staff.init({
    staffId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      required: true,
    },
    lastname: {
      type: DataTypes.STRING,
      required: true,
    },
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Staff',
    tableName: 'staffs',
    timestamps: true,
  });
  return Staff;
};