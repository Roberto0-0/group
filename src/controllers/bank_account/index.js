const { Bank_account } = require("../../models/bank_account/index")
const { User } = require("../../models/user/index")
const { cpf_generator } = require("../../helpers/cpf_generator/index")

module.exports = {
  async bank_account_list(req, res) {
    try {
      const bank_account = await Bank_account.findAll()
      
      res.render("admin/bank_account_settings/list/index.ejs", {
        BANK_ACCOUNT: bank_account
      })
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async bank_account_list_home(req, res) {
    const { user_id } = req.params
    
    try {
      const bank_account = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      if(!bank_account) {
        req.flash("error_message", "Essa conta não existe!")
        res.redirect("/group/account")
      } else {
        res.render("admin/bank_account_settings/list/home/index.ejs", {
          BANK_ACCOUNT: bank_account
        })
      }
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async settings(req, res) {
    try {
      const bank_account = await Bank_account.findAll()
      
      res.render("admin/bank_account_settings/settings/index.ejs", {
        BANK_ACCOUNT: bank_account,
      })
    } catch(err) {
      console.error(err)
      req.flash("error_message", "Internal server error!")
      res.status(500).redirect("/dashboard")
    }
  },
  
  async index(req, res) {
    const { user_id } = req.params
    
    try {
      const user = await User.findOne({
        where: { user_id: user_id }
      })
      if(!user) {
        req.flash("error_messge", "Usuário não existe!")
        res.status(404).redirect("/group/create/bank/account"+ user_id)
      } else {
        const bank_account = await Bank_account.findOne({
          where: { user_id: user_id }
        })
        if(!bank_account) {
          req.flash("error_messge", "Conta bancária não existe!")
          res.status(404).redirect("/dasboard")
        } else {
          res.render("user/bank_account/account_home/index.ejs", {
            BANK_ACCOUNT: bank_account
          })
        }
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  create_index(req, res) {
    try {
      res.render("user/bank_account/create/index.ejs")
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async create(req, res) {
    const { user_id } = req.params
    const { name, profession } = req.body
    
    try {
      const user = await User.findOne({
        where: { user_id: user_id }
      })
      
      if(!user) {
        req.flash("error_messge", "Usuário não existe!")
        res.status(404).redirect("/group/create/bank/account"+ user_id)
      } else {
        const bank_account = await Bank_account.findOne({
          where: { name: name }
        })
        
        if(bank_account) {
          req.flash("error_messge", "Já existe alguém com esse nome!")
          res.status(404).redirect("/group/create/bank/account"+ user_id)
        } else {
          await Bank_account.create({ user_id: user_id, image: req.file.filename, name, profession, cpf: cpf_generator()})
          await user.update({ bank_account: true })
          req.flash("success_message", "Bank account created successfully!")
          res.redirect("/group/account/info/" + user_id)
        }
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async update_index(req, res) {
    const { id, user_id } = req.params
    
    try {
      const user = await User.findOne({
        where: { user_id: user_id }
      })
      if(!user) {
        req.flash("error_message", "Usuário não existe!")
        res.status(404).redirect("/group/bank/account/settings")
      } else {
        const bank_account = await Bank_account.findOne({
          where: { id: id }
        })
        if(!bank_account) {
          req.flash("error_message", "Usuário não existe!")
          res.redirect("/group/bank/account/settings")
        } else {
          res.render("admin/bank_account_settings/update/index.ejs", {
            BANK_ACCOUNT: bank_account
          })
        }
      }
      
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async update(req, res) {
    const { user_id } = req.params
    const { name, profession, money, wage, debt, investment, spending } = req.body
    
    try {
      const bank_account = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      
      if(!bank_account) {
        req.flash("error_message", "Usuário não encontrado")
        res.status(404).redirect("/group/bank/account/settings")
      } else {
        await bank_account.update({ name, profession, money, wage, debt, investment, spending })
        res.redirect("/group/bank/account/settings")
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async destroy(req, res) {
    const { id, user_id } = req.params
  
    try {
      const user = await User.findOne({
        where: { user_id: user_id }
      })
      if(!user) {
        req.flash("error_message", "Usuário não existe!")
        res.status(404).redirect("/group/account/settings")
      } else {
        const bank_account = await Bank_account.findOne({
          where: { id: id }
        })
        if(!bank_account) {
          req.flash("error_message", "Usuário não existe!")
          res.status(404).redirect("/group/bank/account/settings")
        } else {
          console.log(bank_account)
          await bank_account.destroy()
          await user.update({ bank_account: false })
          req.flash("success_message", "Conta deletada!")
          res.status(201).redirect("/group/bank/account/settings")
        }
      }
      
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}