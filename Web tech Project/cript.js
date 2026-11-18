
console.log("JS Connected");


function showError(id, message)
{
    document.getElementById(id).innerHTML = message;
}

function clearError(id)
{
    document.getElementById(id).innerHTML = "";
}

function showToast(message)
{
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}


function validateOfficialEmail()
{
    let Email = document.getElementById("OfficialEmail").value.trim();
    let RegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Email === "")
    {
        showError("EmailError", "* Please enter your corporate email ID");
        return false;
    }
    else if (!RegularExpression.test(Email))
    {
        showError("EmailError", "Please enter the email in the correct format");
        return false;
    }
    clearError("EmailError");
    return true;
}

function validatePassword()
{
    let Pass = document.getElementById("Password").value;

    if (Pass === "")
    {
        showError("PasswordError", "* Please enter your password");
        return false;
    }
    else if (Pass.length < 6)
    {
        showError("PasswordError", "Password must be at least 6 characters");
        return false;
    }
    clearError("PasswordError");
    return true;
}

function login_user(event)
{
    event.preventDefault();

    let emailOk = validateOfficialEmail();
    let passOk = validatePassword();

    if (emailOk && passOk)
    {
        // Valid input -> go straight to the dashboard (no server check)
        window.location.href = "dashboard.html";
    }
    return false;
}


function validTitle()
{
    let Title = document.getElementById("EventTitle").value.trim();

    if (Title === "")
    {
        showError("TitleError", "* Please enter the initiative title");
        return false;
    }
    else if (Title.length < 5)
    {
        showError("TitleError", "Title must carry at least 5 characters");
        return false;
    }
    clearError("TitleError");
    return true;
}

function validCategory()
{
    let Category = document.getElementById("EventCategory").value;

    if (Category === "")
    {
        showError("CategoryError", "* Please select an initiative category");
        return false;
    }
    clearError("CategoryError");
    return true;
}

function validDate()
{
    let DateValue = document.getElementById("EventDate").value;

    if (DateValue === "")
    {
        showError("DateError", "* Please select the initiative date and time");
        return false;
    }
    else if (new Date(DateValue) < new Date())
    {
        showError("DateError", "Initiative date and time must be in the future");
        return false;
    }
    clearError("DateError");
    return true;
}

function validVenue()
{
    let Venue = document.getElementById("EventVenue").value.trim();

    if (Venue === "")
    {
        showError("VenueError", "* Please enter the venue / location address");
        return false;
    }
    else if (Venue.length < 5)
    {
        showError("VenueError", "Please enter a more complete address");
        return false;
    }
    clearError("VenueError");
    return true;
}

function validCount()
{
    let Count = document.getElementById("VolunteerCount").value;

    if (Count === "")
    {
        showError("CountError", "* Please enter the number of volunteers needed");
        return false;
    }
    else if (Count < 1 || Count > 10000)
    {
        showError("CountError", "Volunteers needed must be between 1 and 10000");
        return false;
    }
    clearError("CountError");
    return true;
}

function validFile()
{
    let fileInput = document.getElementById("SanctionLetter");

    if (fileInput.files.length === 0)
    {
        showError("FileError", "* Please upload the proposal brief (PDF)");
        return false;
    }

    let file = fileInput.files[0];
    let isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf)
    {
        showError("FileError", "Only PDF files are allowed");
        return false;
    }
    else if (file.size > 5 * 1024 * 1024)
    {
        showError("FileError", "File size must not exceed 5 MB");
        return false;
    }
    clearError("FileError");
    return true;
}

function validRole()
{
    let Role = document.getElementById("RoleDescription").value.trim();

    if (Role === "")
    {
        showError("RoleError", "* Please describe the role and duty details");
        return false;
    }
    else if (Role.length < 20)
    {
        showError("RoleError", "Description must carry at least 20 characters");
        return false;
    }
    clearError("RoleError");
    return true;
}

function clearAllRequestErrors()
{
    let ids = ["TitleError", "CategoryError", "DateError", "VenueError", "CountError", "FileError", "RoleError"];
    for (let i = 0; i < ids.length; i++)
    {
        clearError(ids[i]);
    }
}


function updateStats()
{
    let total = document.getElementById("totalRequests");
    let pending = document.getElementById("pendingReview");
    total.textContent = parseInt(total.textContent) + 1;
    pending.textContent = parseInt(pending.textContent) + 1;
}


function collect_request(event)
{
    event.preventDefault();

    let results = [
        validTitle(),
        validCategory(),
        validDate(),
        validVenue(),
        validCount(),
        validFile(),
        validRole()
    ];

    if (results.indexOf(false) !== -1)
    {
        showToast("Please fix the highlighted fields.");
        return false;
    }

    showToast("Initiative submitted successfully. It is now pending review.");
    updateStats();
    document.getElementById("requestForm").reset();
    clearAllRequestErrors();
    return false;
}

function setActiveNav(targetId)
{
    let links = document.querySelectorAll(".nav-link[data-target]");
    for (let i = 0; i < links.length; i++)
    {
        if (links[i].getAttribute("data-target") === targetId)
        {
            links[i].classList.add("active");
        }
        else
        {
            links[i].classList.remove("active");
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {

    
    let loginForm = document.getElementById("loginForm");
    if (loginForm)
    {
        loginForm.addEventListener("submit", login_user);
    }

    
    let requestForm = document.getElementById("requestForm");
    if (requestForm)
    {
        requestForm.addEventListener("submit", collect_request);

        requestForm.addEventListener("reset", clearAllRequestErrors);

        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById("EventDate").min = now.toISOString().slice(0, 16);

        let navLinks = document.querySelectorAll(".nav-link[data-target]");
        for (let i = 0; i < navLinks.length; i++)
        {
            navLinks[i].addEventListener("click", function (e) {
                e.preventDefault();
                let targetId = this.getAttribute("data-target");
                document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
                setActiveNav(targetId);
            });
        }

        document.getElementById("logoutLink").addEventListener("click", function (e) {
            if (!confirm("Are you sure you want to log out?"))
            {
                e.preventDefault();
            }
        });

        document.getElementById("notifBtn").addEventListener("click", function () {
            showToast("You have 3 new notifications.");
            document.getElementById("notifCount").style.display = "none";
        });
    }
});