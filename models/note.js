'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "userID"
      });

    }
  }
  Note.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'note'
  });
  return Note;
};