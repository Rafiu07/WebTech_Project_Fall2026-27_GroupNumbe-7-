// =====================================================
// volunteers.js - the volunteer management page
// =====================================================

// Get the list of volunteers (saved list, or the starting list the first time)
var volunteers = loadData("volunteers", startVolunteers);


// Draw the table on the page
function showVolunteers() {
  var rows = "";

  // Go through the list one volunteer at a time and build one table row each
  for (var i = 0; i < volunteers.length; i++) {
    rows = rows + "<tr>";
    rows = rows + "<td>" + (i + 1) + "</td>";
    rows = rows + "<td>" + volunteers[i].name + "</td>";
    rows = rows + "<td>" + volunteers[i].phone + "</td>";
    rows = rows + "<td>" + volunteers[i].email + "</td>";
    rows = rows + "<td><button class='btn-danger' onclick='removeVolunteer(" + i + ")'>Remove</button></td>";
    rows = rows + "</tr>";
  }

  // If the list is empty, show a short message instead
  if (volunteers.length === 0) {
    rows = "<tr><td colspan='5' class='empty'>No volunteers found.</td></tr>";
  }

  document.getElementById("tableBody").innerHTML = rows;
  document.getElementById("count").textContent = volunteers.length;
}


// Add a new volunteer (runs when "Add Volunteer" is clicked)
function addVolunteer() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var email = document.getElementById("email").value.trim();

  // 1. All boxes must be filled in
  if (name === "" || phone === "" || email === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  // 2. The email must contain an @
  if (email.indexOf("@") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // 3. Add the volunteer to the end of the list, save, and redraw the table
  volunteers.push({ name: name, phone: phone, email: email });
  saveData("volunteers", volunteers);
  showVolunteers();

  // 4. Clear the boxes and show a message
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  showMessage(name + " has been added.", "success");
}


// Remove a volunteer (runs when a "Remove" button is clicked)
// "index" is the position of that volunteer in the list
function removeVolunteer(index) {
  var name = volunteers[index].name;

  // Ask the admin to be sure
  if (confirm("Remove " + name + "?") === true) {
    volunteers.splice(index, 1);   // take 1 item out at this position
    saveData("volunteers", volunteers);
    showVolunteers();
    showMessage(name + " has been removed.", "success");
  }
}


// When the Add button is clicked, run addVolunteer
document.getElementById("addBtn").onclick = addVolunteer;

// Draw the table when the page opens
showVolunteers();
