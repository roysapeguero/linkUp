'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventImage, { foreignKey: 'eventId'});
      Event.hasMany(models.Attendance, { foreignKey: 'eventId'});
      Event.belongsTo(models.Venue, { foreignKey: 'venueId' });
      Event.belongsTo(models.Group, { foreignKey: 'groupId' });
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
    },
    groupId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 256]
      },
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate, date is in the future
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate, date is after startDate
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
