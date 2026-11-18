function collect_login_data()
{
    let userValid = validateUsername();
    let passValid = validatePassword();
    
    if (!userValid || !passValid) {
        return false;
    }
    window.location.href = "dashV.html";
    return false; 
}

function validateUsername()
{
    let username = document.getElementById("Username").value.trim();
    let Error = document.getElementById("UsernameError");
    
    if(username === "")
    {
        Error.innerHTML = "* Please enter your username!";
        return false;
    }
    else if(username.length < 4)
    {
        Error.innerHTML = "Username must be at least 4 characters long.";
        return false;
    }
    else {
        Error.innerHTML = "";
        return true;
    }
} 

function validatePassword()
{
    let password = document.getElementById("password").value;
    let Error = document.getElementById("PasswordError");
    
    if(password === "")
    {
        Error.innerHTML = "* Please enter your password!";
        return false;
    }
    else if(password.length < 6)
    {
        Error.innerHTML = "Password must carry at least 6 characters.";
        return false;
    }
    else {
        Error.innerHTML = "";
        return true;
    }
}