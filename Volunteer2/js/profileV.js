let skills = ["First Aid / CPR", "Public Speaking", "Event Logistics", "Youth Tutoring"];
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let freeSlots = ["Fri-PM", "Sat-AM", "Sat-PM"];

let hoursEditing = false;
let aboutEditing = false;
let skillsEditing = false;
let availEditing = false;

function loadProfile()
{
    showSkills();
    showAvailability();
}

function editHours()
{
    let Text = document.getElementById("hoursText");
    let Input = document.getElementById("hoursInput");
    let Button = document.getElementById("hoursBtn");
    let Error = document.getElementById("hoursError");

    if (!hoursEditing)
    {
        Input.value = Text.innerHTML;
        Text.style.display = "none";
        Input.style.display = "block";
        Button.innerHTML = "Save";
        hoursEditing = true;
    }
    else
    {
        if (Input.value === "")
        {
            Error.innerHTML = "* Please enter your total hours";
            return false;
        }
        else if (Input.value < 0)
        {
            Error.innerHTML = "Hours cannot be less than 0";
            return false;
        }
        Error.innerHTML = "";
        Text.innerHTML = Input.value;
        Text.style.display = "block";
        Input.style.display = "none";
        Button.innerHTML = "Edit";
        hoursEditing = false;
    }
}

function editAbout()
{
    let Text = document.getElementById("aboutText");
    let Input = document.getElementById("aboutInput");
    let Button = document.getElementById("aboutBtn");
    let Error = document.getElementById("aboutError");

    if (!aboutEditing)
    {
        Input.value = Text.innerHTML;
        Text.style.display = "none";
        Input.style.display = "block";
        Button.innerHTML = "Save";
        aboutEditing = true;
    }
    else
    {
        let about = Input.value.trim();

        if (about === "")
        {
            Error.innerHTML = "* Please write something about yourself";
            return false;
        }
        else if (about.length < 20)
        {
            Error.innerHTML = "About Me must carry at least 20 characters";
            return false;
        }
        Error.innerHTML = "";
        Text.innerHTML = about;
        Text.style.display = "block";
        Input.style.display = "none";
        Button.innerHTML = "Edit";
        aboutEditing = false;
    }
}

function showSkills()
{
    let html = "";

    for (let i = 0; i < skills.length; i++)
    {
        html += '<span class="skill">' + skills[i] + '</span>';
    }
    document.getElementById("skillsList").innerHTML = html;
}

function editSkills()
{
    let List = document.getElementById("skillsList");
    let Input = document.getElementById("skillsInput");
    let Button = document.getElementById("skillsBtn");
    let Error = document.getElementById("skillsError");

    if (!skillsEditing)
    {
        Input.value = skills.join(", ");
        List.style.display = "none";
        Input.style.display = "block";
        Button.innerHTML = "Save";
        skillsEditing = true;
    }
    else
    {
        let newSkills = [];
        let parts = Input.value.split(",");

        for (let i = 0; i < parts.length; i++)
        {
            if (parts[i].trim() !== "")
            {
                newSkills.push(parts[i].trim());
            }
        }
        if (newSkills.length === 0)
        {
            Error.innerHTML = "* Please enter at least one skill";
            return false;
        }
        Error.innerHTML = "";
        skills = newSkills;
        showSkills();
        List.style.display = "block";
        Input.style.display = "none";
        Button.innerHTML = "Edit";
        skillsEditing = false;
    }
}

function showAvailability()
{
    let html = '<table class="avail-table"><tr>';

    for (let i = 0; i < days.length; i++)
    {
        html += '<th>' + days[i] + '</th>';
    }
    html += '</tr>';

    let times = ["AM", "PM"];
    for (let t = 0; t < times.length; t++)
    {
        html += '<tr>';
        for (let i = 0; i < days.length; i++)
        {
            let name = days[i] + "-" + times[t];
            let on = "";
            if (freeSlots.includes(name))
            {
                on = " on";
            }
            html += '<td><button type="button" class="slot' + on + '" id="' + name + '" onclick="toggleSlot(this)">' + times[t] + '</button></td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById("availGrid").innerHTML = html;
}

function toggleSlot(button)
{
    if (!availEditing)
    {
        return;
    }
    button.classList.toggle("on");
}

function editAvailability()
{
    let Button = document.getElementById("availBtn");

    if (!availEditing)
    {
        availEditing = true;
        Button.innerHTML = "Save";
    }
    else
    {
        freeSlots = [];
        let slots = document.querySelectorAll(".slot");

        for (let i = 0; i < slots.length; i++)
        {
            if (slots[i].classList.contains("on"))
            {
                freeSlots.push(slots[i].id);
            }
        }
        availEditing = false;
        Button.innerHTML = "Edit";
    }
}

function showCV()
{
    let file = document.getElementById("cvFile").files[0];
    let Error = document.getElementById("cvError");
    let Info = document.getElementById("cvInfo");

    if (file === undefined)
    {
        return false;
    }

    let name = file.name.toLowerCase();

    if (!name.endsWith(".pdf") && !name.endsWith(".doc") && !name.endsWith(".docx"))
    {
        Error.innerHTML = "CV Must Be a PDF or Word File";
        document.getElementById("cvFile").value = "";
        Info.innerHTML = "No CV attached yet.";
        return false;
    }
    Error.innerHTML = "";
    Info.innerHTML = "<strong>" + file.name + "</strong> | " + Math.round(file.size / 1024) + " KB | Attached";
}