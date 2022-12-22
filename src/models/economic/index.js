const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../../database/mariadb/index")

const Economic = sequelize.define("economic", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
  money: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  
  investment: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  
  spending: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  
  tax: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
  inflation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

module.exports = { Economic }
