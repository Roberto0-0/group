const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads"))
  },
  
  filename: (req, file, cb) => {
    cb(null, "IMG" + Date.now() + "_" + file.originalname)
  }
})

module.exports = { storage }
