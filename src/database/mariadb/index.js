const { Sequelize } = require("sequelize")
require("dotenv/config")

const DATABASE = process.env.DATABASE
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mariadb",
  timezone: '-03:00',
  dialectOptions: {
    useUTC: false
  }
})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = { sequelize }