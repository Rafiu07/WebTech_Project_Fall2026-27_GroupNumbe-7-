function collect_reg_data()
{
    let nameValid = validName();
    let emailValid = validateEmail();
    let genderValid = validateGender();
    let dobValid = validateDOB();
    let skillValid = validateSkills();
    let ageValid = validAge();
    let phoneValid = validatePhone();
    let cvValid = validateCV();
    let addressValid = validateAddress();
    let availValid = validateAvailability();

    if (!nameValid || !emailValid || !genderValid || !dobValid || !skillValid ||
        !ageValid || !phoneValid || !cvValid || !addressValid || !availValid)
    {
        return false;
    }
    window.location.href = "logIn.html";
    return false;
}

function validName()
{
    let Vname = document.getElementById("volunteerName").value.trim();
    let Error = document.getElementById("NameError");
    if(Vname === "")
    {
        Error.innerHTML = "* Please!! Enter the Name Carefully";
        return false;
    }
    else if (Vname.length < 3)
    {
        Error.innerHTML = "Name Must Carry At least 3 Character";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateEmail()
{
    let Email = document.getElementById("volunteerEmail").value.trim();
    let Error = document.getElementById("EmailError");
    let RegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(Email === "")
    {
        Error.innerHTML = "* Please Enter The Email";
        return false;
    }
    else if (!RegularExpression.test(Email))
    {
        Error.innerHTML = "Please Enter The Email in the Exact Format";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateGender()
{
    let genders = document.querySelectorAll('input[name="volunteerGender"]');
    let GenderError = document.getElementById("GenderError");
    let selectGender = "";

    for(let i = 0; i < genders.length; i++)
    {
        if(genders[i].checked)
        {
            selectGender = genders[i].value;
            break;
        }
    }
    if(selectGender === "")
    {
        GenderError.innerHTML = "* Please Select the Gender";
        return false;
    }
    else{
        GenderError.innerHTML = "";
        return true;
    }
}

function validateDOB()
{
    let DOB = document.getElementById("volunteerDOB").value;
    let Error = document.getElementById("DOBError");
    if(DOB === "")
    {
        Error.innerHTML = "* Please Select Your Date of Birth";
        return false;
    }
    else if (new Date(DOB) > new Date())
    {
        Error.innerHTML = "Date of Birth Cannot Be in the Future";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateSkills()
{
    let Skill = document.getElementById("skills").value;
    let Error = document.getElementById("SkillsError");
    if(Skill === "")
    {
        Error.innerHTML = "* Please Select Your Skill";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validAge()
{
    let VAge = document.getElementById("volunteerAge").value;
    let Error = document.getElementById("AgeError");
    if(VAge === "")
    {
        Error.innerHTML = "* Please!! Enter the Age";
        return false;
    }
    else if(VAge < 16 || VAge > 100)
    {
        Error.innerHTML = "Age Must Be between 16-100";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validatePhone()
{
    let Phone = document.getElementById("volunteerPhone").value.trim();
    let Error = document.getElementById("PhoneError");
    let RegularExpression = /^01[0-9]{9}$/;
    if(Phone === "")
    {
        Error.innerHTML = "* Please Enter The Phone Number";
        return false;
    }
    else if (!RegularExpression.test(Phone))
    {
        Error.innerHTML = "Phone Number Must Be 11 Digits and Start With 01";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateCV()
{
    let CV = document.getElementById("volunteerCV").value.toLowerCase();
    let Error = document.getElementById("CVError");
    if(CV === "")
    {
        Error.innerHTML = "* Please Upload Your CV";
        return false;
    }
    else if (!CV.endsWith(".pdf") && !CV.endsWith(".doc") && !CV.endsWith(".docx"))
    {
        Error.innerHTML = "CV Must Be a PDF or Word File";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateAddress()
{
    let Address = document.getElementById("volunteerAddress").value.trim();
    let Error = document.getElementById("AddressError");
    if(Address === "")
    {
        Error.innerHTML = "* Please Enter Your Address";
        return false;
    }
    else if (Address.length < 10)
    {
        Error.innerHTML = "Address Must Carry At least 10 Character";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}

function validateAvailability()
{
    let days = document.querySelectorAll('input[name="avail"]');
    let Details = document.getElementById("available").value.trim();
    let Error = document.getElementById("AvailError");
    let selectDays = [];

    for (let i = 0; i < days.length; i++)
    {
        if(days[i].checked)
        {
            selectDays.push(days[i].value);
        }
    }
    if(selectDays.length === 0)
    {
        Error.innerHTML = "* Please Select At Least One Preferred Day";
        return false;
    }
    else if (selectDays.includes("SpecificDays") && Details === "")
    {
        Error.innerHTML = "Please Write Your Specific Days and Available Time";
        return false;
    }
    else{
        Error.innerHTML = "";
        return true;
    }
}