const cpf_generator = () => {
  const create = () => {
  	var min = 0
  	var max = 9
  
  	return Math.floor(Math.random() * (max - min) + min)
  }
  
  const cpf = `${create()}${create()}${create()}.${create()}${create()}${create()}.${create()}${create()}${create()}-${create()}${create()}`
  
  return cpf
}


module.exports = { cpf_generator }
