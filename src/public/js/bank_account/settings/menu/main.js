const menu = document.querySelector(".menu")
const nav = document.querySelector(".nav")

menu.onclick = () => {
  console.log("click")
    nav.classList.toggle('active')
}
