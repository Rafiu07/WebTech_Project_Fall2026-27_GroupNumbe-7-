// =====================================================
// login.js - the login page
// =====================================================

// The username and password that are allowed to log in.
// (You can change them here.)
var correctUsername = "admin";
var correctPassword = "admin123";


// Show a message in the message box
function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}


// This runs when the Login button is clicked
function login() {
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;

  // 1. Both boxes must be filled in
  if (username === "" || password === "") {
    showMessage("Please fill in both fields.", "error");
    return;
  }

  // 2. Check the username and password
  if (username === correctUsername && password === correctPassword) {
    // Remember that the admin is logged in, then open the dashboard
    sessionStorage.setItem("loggedIn", "yes");
    window.location.href = "dashboard.html";
  } else {
    showMessage("Wrong username or password.", "error");
  }
}


// When the Login button is clicked, run the login function
document.getElementById("loginBtn").onclick = login;
