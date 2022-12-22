const multer = require("multer")
const { storage } = require("../../services/multer/index")

class Upload {
  constructor() {
    this.upload = multer({ storage: storage })
  }
}

module.exports = new Upload().upload
