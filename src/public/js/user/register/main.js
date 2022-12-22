const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm-password")
const eye_password = document.querySelector("#eye-password")
const eye_confirmPassword = document.querySelector("#eye-confirm-password")

eye_password.onclick = () => {
    if(password.type == "password") {
        password.type = "text"
        eye_password.src = "/assets/eye-closed-bold.svg"
    } else {
        if(password.type == "text") {
            password.type = "password"
            eye_password.src = "/assets/eye-bold.svg"
        }
    }
}

eye_confirmPassword.onclick = () => {
    if(confirm_password.type == "password") {
        confirm_password.type = "text"
        eye_confirmPassword.src = "/assets/eye-closed-bold.svg"
    } else {
        if(confirm_password.type == "text") {
            confirm_password.type = "password"
            eye_confirmPassword.src = "/assets/eye-bold.svg"
        }
    }
}
