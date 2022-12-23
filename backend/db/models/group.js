'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Event, { foreignKey: 'groupId', onDelete: 'CASCADE' });
      Group.hasMany(models.Venue, { foreignKey: 'groupId', onDelete: 'SET NULL' });
      Group.hasMany(models.GroupImage, { foreignKey: 'groupId', onDelete: 'CASCADE' });
      Group.hasMany(models.Membership, { foreignKey: 'groupId', onDelete: 'CASCADE' });
      Group.belongsTo(models.User, { foreignKey: 'organizerId' });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 60]
      },
      allowNull: false
    },
    about:{
      type: DataTypes.TEXT,
      validate: {
        len: [5, 2000]
      },
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false
    },
    private:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false
    },
    state:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
