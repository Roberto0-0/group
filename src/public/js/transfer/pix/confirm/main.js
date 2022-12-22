const date = document.getElementsByClassName("date")
const money = document.getElementsByClassName("money")

const local_time = new Date()

const main = () => {
  for(var i=0;i < money.length;i++) {
    date[i].innerHTML = `${dayjs(local_time.now).format("DD/MM/YY")}`
    money[i].innerHTML = `${Number(money[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
}

main()
