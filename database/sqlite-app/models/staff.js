'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {

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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Staff',
    tableName: 'staffs',
  });
  return Staff;
};