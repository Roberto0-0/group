const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../../database/mariadb/index")

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  bank_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

module.exports = { User }
