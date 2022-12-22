const { Router } = require("express")
const upload = require("../config/multer/index")
const Index = require("../controllers/group/index")
const User = require("../controllers/user/index")
const Home = require("../controllers/home/index")
const Bank_account = require("../controllers/bank_account/index")
const Economic = require("../controllers/economic/index")
const Transfer = require("../controllers/transfer/index")
const { isAdmin } = require("../helpers/isAdmin/index")
const { isAuth } = require("../helpers/isAuth/index")

class Routes {
  constructor() {
    this.router = Router()
    
    this.home()
    this.user()
    this.group()
  }
  
  home() {
    this.router.get("/", Home.index)
  }
  
  user() {
    this.router.get("/login", User.login_index)
    this.router.post("/login/authenticate", User.login)
    this.router.get("/register", User.register_index)
    this.router.post("/register", User.register)
    this.router.get("/dashboard", isAuth, User.dashboard)
    this.router.get("/logout", User.logout)
  }
  
  group() {
    //GROUP PAGE
    this.router.get("/group", isAuth, Index.index)
    
    //GROUP ECONOMIC
    //this.router.get("/group/economic/settings", isAuth, isAdmin, Economic.settings)
    this.router.get("/group/economic/create", isAuth, isAdmin, Economic.create_index)
    this.router.post("/group/economic/create", Economic.create)
    //this.router.get("/group/economic/update/:id", isAuth, isAdmin, Economic.update_index)
    //this.router.post("/group/economic/update/:id", Economic.update)
    //this.router.get("/group/economic/delete/:id", group.destroy)
    
    
    //BANK ACCOUNT
    this.router.get("/group/bank/account/settings", isAuth, isAdmin, Bank_account.settings)
    this.router.get("/group/account/info/:user_id", isAuth, Bank_account.index)
    this.router.get("/group/bank/account", isAuth, isAdmin, Bank_account.bank_account_list)
    this.router.get("/group/bank/account/:user_id", isAuth, isAdmin, Bank_account.bank_account_list_home)
    this.router.get("/group/create/bank/account/:user_id", isAuth, Bank_account.create_index)
    this.router.post("/group/create/bank/account/:user_id", upload.single("image"), Bank_account.create)
    this.router.get("/group/update/bank/account/:id/:user_id", isAuth, isAdmin, Bank_account.update_index)
    this.router.post("/group/update/bank/account/:user_id", Bank_account.update)
    this.router.get("/group/account/delete/:id/:user_id", Bank_account.destroy)
    
    
    //USER TRANSFER
    this.router.get("/group/bank/pay/:user_id", isAuth, isAdmin, Transfer.bankPay_index)
    this.router.post("/group/bank/pay/:user_id", Transfer.bankPay)
    this.router.get("/group/investment/:user_id", isAuth, Transfer.investment_index)
    this.router.post("/group/investment/:user_id", Transfer.investment)
    this.router.get("/group/pix/:user_id", isAuth, Transfer.pix_index)
    this.router.post("/group/pix/:user_id", Transfer.pix)
  }
}

module.exports = new Routes().router
