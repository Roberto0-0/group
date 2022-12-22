module.exports = {
  isAuth: function(req, res, next) {
    if(req.isAuthenticated()) {
      next()
    } else {
      req.flash("error_message", "Você precisa está logado!")
      res.redirect("/")
    }
  }
}
