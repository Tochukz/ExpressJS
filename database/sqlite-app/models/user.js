'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.User.belongsTo(models.Staff, {foreignKey: 'staffId', sourceKey: 'staffId',  as: 'staff'});
    }
  };
  user.init({
    userId: {
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
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });
  return user;
};