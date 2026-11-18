

var correctUsername = "admin";
var correctPassword = "admin123";


function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}


function login() {
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;


  if (username === "" || password === "") {
    showMessage("Please fill in both fields.", "error");
    return;
  }


  if (username === correctUsername && password === correctPassword) {
   
    sessionStorage.setItem("loggedIn", "yes");
    window.location.href = "dashboard.html";
  } else {
    showMessage("Wrong username or password.", "error");
  }
}



document.getElementById("loginBtn").onclick = login;
