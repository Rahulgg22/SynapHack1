// SQL Evaluation model
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sql');

const Evaluation = sequelize.define('Evaluation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamId: { type: DataTypes.INTEGER, allowNull: false },
  judgeId: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.FLOAT, allowNull: false },
  feedback: { type: DataTypes.TEXT },
}, {
  tableName: 'Evaluations',
  timestamps: true,
});

module.exports = Evaluation;
