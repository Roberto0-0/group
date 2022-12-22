const { Economic } = require("../../models/economic/index")
const { Bank_account } = require("../../models/bank_account/index")

module.exports = {
  async index(req, res) {
    try {
      const economic = await Economic.findAll()
      const spending = await Economic.findOne({
        where: { name: "Riqueza" }
      })
      const bank_account = await Bank_account.findAll({
        order: [
          ["money", "DESC"]
        ]
      })
      
      res.render("group/index.ejs",{
        ECONOMIC: economic,
        BANK_ACCOUNT: bank_account,
        SPENDING: spending.spending 
      })
    } catch(err) {
      console.error(err)
      req.flash("error_message", "Internal server error!")
      res.status(500).redirect("/")
    }
  }
}
