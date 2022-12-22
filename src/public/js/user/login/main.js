const password = document.querySelector("#password")
const btn = document.querySelector("#eye-button")

btn.onclick = () => {
    if(password.type == "password") {
        password.type = "text"
        btn.src = "/assets/eye-closed-bold.svg"
    } else {
        if(password.type == "text") {
            password.type = "password"
            btn.src = "/assets/eye-bold.svg"
        }
    }
}
