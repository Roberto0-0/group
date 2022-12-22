const { User } = require("../../models/user/index")
const { CreatePasswordHash } = require("../../services/bcrypt/index")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const uuid = require("uuid")

module.exports = {
  register_index(req, res) {
    res.render("user/register/index.ejs")
  },
  
  async register(req, res) {
    const { name, email, password, confirmPassword } = req.body
    
    try {
      const user = await User.findOne({
        where: { email: email }
      })
      
      if(user) {
        req.flash("error_message", "Usuário já existe!")
        res.redirect("/register")
      } else {
        if(password != confirmPassword) {
          req.flash("error_message", "Senhas diferentes!")
          res.redirect("/register")
        } else {
          const newPassword = await CreatePasswordHash(password)
          
          await User.create({ user_id: uuid.v4(), name, email, password: newPassword })
          req.flash("success_message", "Usuário criado com sucesso!")
          res.redirect("/login")
        }
      }
    } catch(err) {
      console.error("Internal server error!", err)
      req.flash("error_message", "Internal server error!")
      res.status(500).redirect("/register")
    }
  },
  
  login_index(req, res) {
    res.render("user/login/index.ejs")
  },
  
  login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next)
  },
  
  dashboard(req, res) {
    res.render("user/dashboard/index.ejs")
  },
  
  logout(req, res) {
    req.logout(function(err) {
      if (err) { return next(err) }
      req.flash("success_message", "Volte sempre!")
      res.redirect('/')
    })
  }
}
