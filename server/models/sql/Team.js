// SQL Team model
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sql');

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'Teams',
  timestamps: true,
});

module.exports = Team;
