function toggleProfile()
{
    let menu = document.getElementById("profileMenu");

    if (menu.style.display === "block")
    {
        menu.style.display = "none";
    }
    else
    {
        menu.style.display = "block";
    }
}

function applyNow(button)
{
    let applied = document.getElementById("statApplied");

    applied.innerHTML = Number(applied.innerHTML) + 1;
    button.innerHTML = "Applied";
    button.disabled = true;
}