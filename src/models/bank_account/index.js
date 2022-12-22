const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../../database/mariadb/index")

const Bank_account = sequelize.define("bank_accounts", {
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
  
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
  profession: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  
  money: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: true
  },
  
  wage: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: true
  },
  
  debt: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: true
  },
  
  investment: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: true
  },
  
  spending: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: true
  }
})

module.exports = { Bank_account }