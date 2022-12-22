const { Economic } = require("../../models/economic/index")

module.exports = {
  create_index(req, res) {
    res.render("admin/create_economic/index.ejs")
  },
  
  async create(req, res) {
    const { 
      name,
      money,
      investment,
      spending,
      tax,
      inflation
    } = req.body
    
    try {
      const economic = await Economic.findOne({
        where: { name: name }
      })
      
      if(economic) {
        req.flash("error_message", "Economic already exist!")
        res.redirect("/group/economic/create")
      } else {
        await Economic.create({
          name,
          money,
          investment,
          spending,
          tax,
          inflation
        })
        res.redirect("/group")
      }
    } catch(err) {
      console.error(err)
      req.flash("error_message", "Internal server error!")
      res.status(500).redirect("/group")
    }
  }
}
