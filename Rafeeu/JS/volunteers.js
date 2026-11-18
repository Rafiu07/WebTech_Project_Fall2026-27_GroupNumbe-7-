
var volunteers = loadData("volunteers", startVolunteers);


// Draw the table on the page
function showVolunteers() {
  var rows = "";

  for (var i = 0; i < volunteers.length; i++) {
    rows = rows + "<tr>";
    rows = rows + "<td>" + (i + 1) + "</td>";
    rows = rows + "<td>" + volunteers[i].name + "</td>";
    rows = rows + "<td>" + volunteers[i].phone + "</td>";
    rows = rows + "<td>" + volunteers[i].email + "</td>";
    rows = rows + "<td><button class='btn-danger' onclick='removeVolunteer(" + i + ")'>Remove</button></td>";
    rows = rows + "</tr>";
  }


  if (volunteers.length === 0) {
    rows = "<tr><td colspan='5' class='empty'>No volunteers found.</td></tr>";
  }

  document.getElementById("tableBody").innerHTML = rows;
  document.getElementById("count").textContent = volunteers.length;
}



function addVolunteer() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var email = document.getElementById("email").value.trim();


  if (name === "" || phone === "" || email === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }


  if (email.indexOf("@") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }


  volunteers.push({ name: name, phone: phone, email: email });
  saveData("volunteers", volunteers);
  showVolunteers();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  showMessage(name + " has been added.", "success");
}



function removeVolunteer(index) {
  var name = volunteers[index].name;


  if (confirm("Remove " + name + "?") === true) {
    volunteers.splice(index, 1);   // take 1 item out at this position
    saveData("volunteers", volunteers);
    showVolunteers();
    showMessage(name + " has been removed.", "success");
  }
}


document.getElementById("addBtn").onclick = addVolunteer;

showVolunteers();
