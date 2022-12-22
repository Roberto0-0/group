const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { User } = require("../../models/user/index")
const bcrypt = require("bcryptjs")

module.exports = function(passport) {
  passport.use(new LocalStrategy({ 
    usernameField: "email",
    passwordField: "password"
  }, 
    (email, password, done) => {
      User.findOne({
        where: { email: email }
      }).then((user) => {
        if(!user) {
          return done(null, false, { message: "E-mail/senha incorreto!" })
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "E-mail/senha incorreto!" })
            }
          })
        }
      })
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)
      if(user) {
        done(null, user)
      }
    } catch(err) {
      done(err, null)
    }
  })
}
