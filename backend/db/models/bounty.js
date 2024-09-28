'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bounty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bounty.belongsTo(models.User, {foreignKey:"userId", onDelete:"CASCADE"}),
      Bounty.hasMany(models.Comment, {foreignKey: "bountyId", onDelete: "CASCADE"}),
      Bounty.hasMany(models.CompletedBounty, {foreignKey: "bountyId"})
    }
  }
  Bounty.init({
    title: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(500),
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bounty',
  });
  return Bounty;
};