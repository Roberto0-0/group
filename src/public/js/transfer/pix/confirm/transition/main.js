const id = document.getElementById("id").textContent

setTimeout(() => {
  window.location.href = `/group/account/info/${id}`
}, 5000)