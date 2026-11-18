// =====================================================
// organizations.js - the organization management page
// =====================================================

// Get the lists we need
var organizations = loadData("organizations", startOrganizations);
var events = loadData("events", startEvents);


// Draw the table on the page
function showOrganizations() {
  var rows = "";

  for (var i = 0; i < organizations.length; i++) {
    rows = rows + "<tr>";
    rows = rows + "<td>" + (i + 1) + "</td>";
    rows = rows + "<td>" + organizations[i].name + "</td>";
    rows = rows + "<td>" + organizations[i].regNo + "</td>";
    rows = rows + "<td>" + organizations[i].focus + "</td>";
    rows = rows + "<td>" + organizations[i].email + "</td>";
    rows = rows + "<td>" + organizations[i].phone + "</td>";
    rows = rows + "<td>" + organizations[i].address + "</td>";
    rows = rows + "<td><button class='btn-danger' onclick='removeOrganization(" + i + ")'>Remove</button></td>";
    rows = rows + "</tr>";
  }

  if (organizations.length === 0) {
    rows = "<tr><td colspan='8' class='empty'>No organizations found.</td></tr>";
  }

  document.getElementById("tableBody").innerHTML = rows;
  document.getElementById("count").textContent = organizations.length;
}


// Add a new organization (runs when "Add Organization" is clicked)
function addOrganization() {
  var name = document.getElementById("name").value.trim();
  var regNo = document.getElementById("regNo").value.trim();
  var focus = document.getElementById("focus").value;
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();

  // 1. All boxes must be filled in
  if (name === "" || regNo === "" || focus === "" || email === "" || phone === "" || address === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  // 2. The email must contain an @
  if (email.indexOf("@") === -1) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // 3. Add the organization to the list, save, and redraw the table
  organizations.push({
    name: name,
    regNo: regNo,
    focus: focus,
    email: email,
    phone: phone,
    address: address
  });
  saveData("organizations", organizations);
  showOrganizations();

  // 4. Clear the boxes and show a message
  document.getElementById("name").value = "";
  document.getElementById("regNo").value = "";
  document.getElementById("focus").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  showMessage(name + " has been added.", "success");
}


// Remove an organization (runs when a "Remove" button is clicked)
function removeOrganization(index) {
  var name = organizations[index].name;

  if (confirm("Remove " + name + "? Events posted by this organization will also be removed.") === true) {

    // 1. Take the organization out of its list
    organizations.splice(index, 1);
    saveData("organizations", organizations);

    // 2. Make a new events list that keeps only the events
    //    that were NOT posted by this organization
    var keptEvents = [];
    for (var i = 0; i < events.length; i++) {
      if (events[i].org !== name) {
        keptEvents.push(events[i]);
      }
    }
    events = keptEvents;
    saveData("events", events);

    // 3. Redraw the table and show a message
    showOrganizations();
    showMessage(name + " has been removed.", "success");
  }
}


// When the Add button is clicked, run addOrganization
document.getElementById("addBtn").onclick = addOrganization;

// Draw the table when the page opens
showOrganizations();
