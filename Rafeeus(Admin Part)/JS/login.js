// Hard-coded credentials (change these whenever you want)
var ADMIN_USERNAME = "admin";
var ADMIN_PASSWORD = "admin123";

var form = document.getElementById("loginForm");
var messageBox = document.getElementById("message");

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = "message " + type;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;

  if (username === "" || password === "") {
    showMessage("Please fill in both fields.", "error");
    return;
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem("loggedIn", "true");
    showMessage("Login successful!", "success");

    // Go to the dashboard after a short moment
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 800);
  } else {
    showMessage("Invalid username or password.", "error");
  }
});
