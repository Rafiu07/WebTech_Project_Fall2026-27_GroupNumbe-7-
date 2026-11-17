var form = document.getElementById("signupForm");
var messageBox = document.getElementById("message");

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = "message " + type;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var fullname = document.getElementById("fullname").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;

  if (fullname === "" || email === "" || password === "" || confirm === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirm) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  showMessage("Account created! Redirecting to login...", "success");

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
});
