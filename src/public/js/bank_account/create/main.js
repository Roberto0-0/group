const form = document.querySelector("form")
const fileUpload = form.querySelector(".input-file")
const check = document.querySelector(".check")
const fileName = document.querySelector(".file-name")

fileUpload.onchange = ({target}) => {
  const file = target.files[0]
  console.log(file.name, file.size)
  if(file) {
    check.src = "/assets/check-circle-light.svg"
    fileName.innerHTML = `${file.name}`
  }
}
