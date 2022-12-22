module.exports = {
  isAdmin: function(req, res, next) {
    if(req.isAuthenticated() && req.user.isAdmin == 1) {
      next()
    } else {
      req.flash("error_message", "Você não um ADM!")
      res.redirect("/")
    }
  }
}
