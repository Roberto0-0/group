const date = document.getElementsByClassName("date")
const money = document.getElementsByClassName("money")

const main = () => {
  for(var i=0;i < money.length;i++) {
    date[i].innerHTML = `${dayjs(date.textContent).format("DD/MM/YY")}`
    money[i].innerHTML = `${Number(money[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
}

main()
