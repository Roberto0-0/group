const { Economic } = require("../../models/economic/index")
const { Bank_account } = require("../../models/bank_account/index")

module.exports = {
  async bankPay_index(req, res) {
    const { user_id } = req.params
    
    try {
      const bank_account = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      
      if(!bank_account) {
        res.status(404).send({ message: "Bank_account not fould" })
      } else {
        res.render("transfer/bank_pay/index.ejs", {
          BANK_ACCOUNT: bank_account
        })
      }
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Internal server error" })
    }
    
  },
  
  async bankPay(req, res) {
    const { user_id } = req.params
    const bankName = "Riqueza"
    
    try {
      const economic = await Economic.findOne({
        where: { name: bankName }
      })
  
      if(!economic) {
        res.status(404).send({ message: "economic not fould!" })
      } else {
        const bank_account = await Bank_account.findOne({
          where: { user_id: user_id }
        })
        if(!bank_account) {
          res.status(404).send({ message: "Bank_account not fould!" })
        } else {
          if(bank_account.debt > 0) {
            if(economic.money >= bank_account.wage) {
              if(bank_account.debt >= bank_account.wage) {
                var NewEconomicMoney  =  (economic.money - bank_account.wage)
                var NewEconomicSpending = (economic.spending + bank_account.wage)
                var NewBank_accountMoney = (bank_account.money + 0)
                var NewBank_accountDebt = (bank_account.debt - bank_account.wage)
                
                await economic.update({ money: NewEconomicMoney, spending: NewEconomicSpending })
                await bank_account.update({ money: NewBank_accountMoney, debt: Math.abs(NewBank_accountDebt) })
                
                res.redirect("/group/bank/account/settings")
              } else if(bank_account.debt < bank_account.wage) {
                var NewEconomicMoney  =  (economic.money - bank_account.wage)
                var NewEconomicSpending = (economic.spending + bank_account.wage)
                var NewBank_accountMoney = (bank_account.money + Math.abs((bank_account.wage - bank_account.debt)))
                var NewBank_accountDebt = 0
                console.log(NewBank_accountDebt)
                
                await economic.update({ money: NewEconomicMoney, spending: NewEconomicSpending })
                await bank_account.update({ money: NewBank_accountMoney, debt: NewBank_accountDebt })
                
                res.redirect("/group/bank/account/settings")
              }
            }
          } else if(bank_account.debt <= 0) {
            if(economic.money >= bank_account.wage) {
              var NewEconomicMoney  =  (economic.money - bank_account.wage)
              var NewEconomicSpending = (economic.spending + bank_account.wage)
              var NewBank_accountMoney = (bank_account.money + bank_account.wage)
              
              await economic.update({ money: NewEconomicMoney, spending: NewEconomicSpending })
              await bank_account.update({ money: NewBank_accountMoney })
              
              res.redirect("/group/bank/account/settings")
            }
          }
        }
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async investment_index(req, res) {
    const { user_id } = req.params
    
    try {
      const bank_account = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      
      if(!bank_account) {
        res.status(404).send({ message: "Bank_account not fould" })
      } else {
        res.render("transfer/investment/index.ejs", {
          BANK_ACCOUNT: bank_account
        })
      }
    } catch(err) {
      console.error(err)
      res.status(500).send({ message: "Internal server error" })
    }
  },
  
  async investment(req, res) {
    const { user_id } = req.params
    const { investment, information } = req.body
    
    try {
      const economic = await Economic.findOne({
        where: { name: "Riqueza" }
      })
  
      if(!economic) {
        res.status(404).send({ message: "economic not fould!" })
      } else {
        const bank_account = await Bank_account.findOne({
          where: { user_id: user_id }
        })
        if(!bank_account) {
          res.status(404).send({ message: "Bank_account not fould!" })
        } else {
          if(bank_account.money < Number(investment)) {
            var NewDebt  =  (bank_account.money - Number(investment))
            var NewBank_accountDebt =  (bank_account.debt + Math.abs(NewDebt))
            var NewEconomicMoney = (economic.money - Math.abs(NewDebt))
            var NewBank_accountInvestment = (bank_account.investment + Number(investment))
            var NewEconomicSpending = (economic.spending + Math.abs(NewDebt))
            var NewBank_accountMoney = 0
        
            await economic.update({ money: NewEconomicMoney, spending: NewEconomicSpending })
            await bank_account.update({ money: NewBank_accountMoney, debt: NewBank_accountDebt, investment: NewBank_accountInvestment })
            
            res.render("transfer/investment/confirm/index.ejs", {
              BANK_ACCOUNT: bank_account,
              MONEY: investment,
              INFORMATION: information,
              DATE: Date.now()
            })
          } if(bank_account.money > Number(investment)) {
            var NewBank_accountInvestment = (bank_account.investment + Number(investment))
            var NewBank_accountMoney = (bank_account.money - Number(investment))
            
            await bank_account.update({ money: NewBank_accountMoney, investment: NewBank_accountInvestment })
            
            res.render("transfer/investment/confirm/index.ejs", {
              BANK_ACCOUNT: bank_account,
              MONEY: investment,
              INFORMATION: information,
              DATE: Date.now()
            })
          }
        }
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async pix_index(req, res) {
    const { user_id } = req.params
    
    try {
      const bank_account = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      
      if(!bank_account) {
        return res.status(404).send({ message: "Bank_account not found!" })
      } else {
        res.render("transfer/pix/index.ejs", {
          BANK_ACCOUNT: bank_account
        })
      }
    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  },
  
  async pix(req, res) {
    const { user_id } = req.params
    const { cpf, money } = req.body
    
    try {
      const bank_accountSend = await Bank_account.findOne({
        where: { user_id: user_id }
      })
      
      if(!bank_accountSend) {
        req.flash("error_message", "Usuário não encontrado!")
        res.redirect("/dashboard")
      } else {
        if(cpf == bank_accountSend.cpf) {
          req.flash("error_message", "Não é possível!")
          res.redirect("/group/account/info/" + bank_accountSend.user_id)
        } else {
          if(bank_accountSend.money > Math.abs(money)) {
            const bank_accountReceived = await Bank_account.findOne({
              where: { cpf: cpf }
            })
            
            if(!bank_accountReceived) {
              req.flash("error_message", "CPF não encontrado!")
              res.redirect("/group/account/info/" + bank_accountSend.user_id)
            } else {
              if(bank_accountReceived.debt == 0) {
                var NewBank_accountSendMoney = (bank_accountSend.money - Math.abs(money))
                var NewBank_accountReceivedMoney = (bank_accountReceived.money + Math.abs(money))
                
                await bank_accountSend.update({ money: NewBank_accountSendMoney })
                await bank_accountReceived.update({ money: NewBank_accountReceivedMoney })
                
                res.render("transfer/pix/confirm/index.ejs", {
                  BANK_ACCOUNT_RECEIVED: bank_accountReceived,
                  BANK_ACCOUNT_SEND: bank_accountSend,
                  MONEY: money,
                  DATE: Date.now()
                })
                
              } if(bank_accountReceived.debt > 0) {
                if(Math.abs(money) >= bank_accountReceived.debt) {
                  var NewBank_accountSendMoney = (bank_accountSend.money - Math.abs(money))
                  var NewBank_accountReceivedDebt = (bank_accountReceived.debt - Math.abs(money))
                  var NewBank_accountReceivedMoney = (bank_accountReceived.money + Math.abs(NewBank_accountReceivedDebt))
                  
                  await bank_accountSend.update({ money: NewBank_accountSendMoney })
                  await bank_accountReceived.update({ money: NewBank_accountReceivedMoney, debt: 0 })
                  
                  res.render("transfer/pix/confirm/index.ejs", {
                    BANK_ACCOUNT_RECEIVED: bank_accountReceived,
                    BANK_ACCOUNT_SEND: bank_accountSend,
                    MONEY: money,
                    DATE: Date.now()
                  })
                } if(Math.abs(money < bank_accountReceived.debt)) {
                  var NewBank_accountSendMoney = (bank_accountSend.money - Math.abs(money))
                  var NewBank_accountReceivedDebt = (bank_accountReceived.debt - Math.abs(money))
                  
                  await bank_accountSend.update({ money: NewBank_accountSendMoney })
                  await bank_accountReceived.update({ debt: NewBank_accountReceivedDebt })
                  
                  res.render("transfer/pix/confirm/index.ejs", {
                    BANK_ACCOUNT_RECEIVED: bank_accountReceived,
                    BANK_ACCOUNT_SEND: bank_accountSend,
                    MONEY: money,
                    DATE: Date.now()
                  })
                }
                
                res.render("transfer/pix/confirm/index.ejs", {
                  BANK_ACCOUNT_RECEIVED: bank_accountReceived,
                  BANK_ACCOUNT_SEND: bank_accountSend,
                  MONEY: money,
                  DATE: Date.now()
                })
              }
            }
          } else if(bank_accountSend.money < Math.abs(money)) {
            req.flash("error_message", "Dinheiro insuficiente!")
            res.redirect("/group/account/info/" + bank_accountSend.user_id)
          }
        }
      }
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}