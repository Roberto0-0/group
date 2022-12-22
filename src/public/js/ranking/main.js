const li_ranking = document.getElementsByClassName("li-ranking")
const progress = document.getElementsByClassName("progress")
const percent = document.getElementsByClassName("percent")
const money = document.getElementsByClassName("money")

const main_ranking = () => {
  
  li_ranking[li_ranking.length - 1].classList.toggle("end-ranking")
  
  for(var i=0;i <= li_ranking.length;i++) {
    progress[i].style.width = `${percent[i].textContent.replace("%", "")}%`
    
    money[i].innerHTML = `${Number(money[i].textContent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  }
  
}

main_ranking()