


function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}


function signup() {
  var fullname = document.getElementById("fullname").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm").value;


  if (fullname === "" || email === "" || password === "" || confirmPassword === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }


  if (email.indexOf("@") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }


  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }


  showMessage("Account created! You can now log in.", "success");
}



document.getElementById("signupBtn").onclick = signup;
