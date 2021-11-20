const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
      notNull: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  loginToken: {
    type: Sequelize.STRING,
    allowNull: true

  },
  loginTokenExpiration: {
    type: Sequelize.DATE,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "new"
  }
});
module.exports = User;