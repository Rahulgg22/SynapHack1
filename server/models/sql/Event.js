// SQL Event model
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sql');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'Events',
  timestamps: true,
});

module.exports = Event;
