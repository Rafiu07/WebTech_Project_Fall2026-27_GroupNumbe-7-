// =====================================================
// signup.js - the sign up page
// (It only checks the form. It does not save an account,
//  because this project has no database.)
// =====================================================


// Show a message in the message box
function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}


// This runs when the Sign Up button is clicked
function signup() {
  var fullname = document.getElementById("fullname").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm").value;

  // 1. Every box must be filled in
  if (fullname === "" || email === "" || password === "" || confirmPassword === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  // 2. The email must contain an @
  if (email.indexOf("@") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // 3. The password must be at least 6 characters long
  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  // 4. Both passwords must match
  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  // Everything is fine
  showMessage("Account created! You can now log in.", "success");
}


// When the Sign Up button is clicked, run the signup function
document.getElementById("signupBtn").onclick = signup;
