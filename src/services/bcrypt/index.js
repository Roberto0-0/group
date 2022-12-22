const bcrypt = require("bcryptjs")

const CreatePasswordHash = async (password) => {
  const hash = bcrypt.hash(password, 10)
  
  return hash
}

module.exports = { CreatePasswordHash }
