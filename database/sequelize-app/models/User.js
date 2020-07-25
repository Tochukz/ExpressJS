const { Model, STRING, INTEGER, ENUM  } = require('sequelize');
const sequelize = require('../db/sequelize');

class User extends Model {}
User.init({
  userId: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: { 
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: ENUM('male', 'female'),
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize,
  // other model options
});

module.exports = User;
