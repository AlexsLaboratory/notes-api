const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Workout = sequelize.define('workout', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Workout;