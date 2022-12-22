const date_economic = document.getElementsByClassName("date-economic")
const time_economic = document.getElementsByClassName("time-economic")
const li_economic = document.getElementsByClassName("li-economic")
const money_economic = document.getElementsByClassName("money-economic")
const percent_economic = document.getElementsByClassName("percent-economic")

const main_economic = () => {
  li_economic[li_economic.length - 1].classList.toggle("end-economic")
  
  for(var i=0; i < date_economic.length;i++) {
    date_economic[i].innerHTML = `${dayjs(date_economic[i].textContent).format("DD/MM/YY")}`
    time_economic[i].innerHTML = `${dayjs(time_economic[i].textContent).format("HH:mm")}`
  }
  
  for(var i=0; i < money_economic.length;i++) {
    money_economic[i].innerHTML = `${Number(money_economic[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }

}

main_economic()