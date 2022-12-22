const date = document.getElementsByClassName("date")
const time = document.getElementsByClassName("time")
const li = document.getElementsByClassName("li")
const money = document.getElementsByClassName("money")
const debt = document.getElementsByClassName("debt")

const main = () => {
  li[li.length - 1].classList.toggle("end")
  
  for(var i=0; i < money.length;i++) {
    if(Number(debt.textContent) > 0) {
      document.getElementsByClassName("debt")[i].style.color = "#ff8080"
    }
    money[i].innerHTML = `${Number(money[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
}

main()