const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE, 
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  venueName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venueAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ticketPrice: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  additionalImage1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  additionalImage2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  additionalImage3: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Event;
