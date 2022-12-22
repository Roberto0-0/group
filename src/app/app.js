const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const ejs = require("ejs")
const routes = require("../routes/index.js")
const session = require("express-session")
const flash = require("connect-flash")
const { sequelize } = require("../database/mariadb/index")
var passport = require('passport')
require('../config/auth/index')(passport)

class App {
  constructor() {
    this.app = express()
    this.sequelizeSync = sequelize
    
    this.middlewares()
    this.routes()
  }
  
  middlewares() {
    this.app.use(session({
      secret: "secret",
      resave: false,
      saveUnitialized: false,
      cookie: { maxAge: 24 * 60 * 1000 }
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(flash())
    this.app.use((req, res, next) => {
      res.locals.success_message = req.flash("success_message")
      res.locals.error_message = req.flash("error_message")
      res.locals.error = req.flash("error")
      res.locals.user = req.user || null
      next()
    })
    
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    
    this.app.use(express.static(path.join(__dirname, "..", "public")))
    this.app.use(express.static(path.resolve(__dirname, "..", "..", "tmp", "uploads")))
    this.app.set("views", path.join(__dirname, "..", "views"))
    this.app.engine("ejs", require("ejs").renderFile)
    this.app.set("views engine", "ejs")
  
    this.sequelizeSync.sync()
  }
  
  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
