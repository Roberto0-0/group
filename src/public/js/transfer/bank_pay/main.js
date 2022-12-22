const money = document.getElementsByClassName("money")

const main = () => {
  for(var i=0; i < money.length;i++) {
    money[i].innerHTML = `${Number(money[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
}

main()
