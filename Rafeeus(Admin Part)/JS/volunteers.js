var volunteers = loadData("volunteers");
var tableBody = document.getElementById("tableBody");
var countEl = document.getElementById("count");
var form = document.getElementById("addForm");

function render() {
  tableBody.innerHTML = "";
  countEl.textContent = volunteers.length;

  if (volunteers.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = makeEl("td", "No volunteers found.", "empty");
    emptyCell.colSpan = 5;
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    return;
  }

  volunteers.forEach(function (v, i) {
    var row = document.createElement("tr");
    row.appendChild(makeEl("td", i + 1));
    row.appendChild(makeEl("td", v.name));
    row.appendChild(makeEl("td", v.phone));
    row.appendChild(makeEl("td", v.email));

    var actionCell = document.createElement("td");
    var removeBtn = makeEl("button", "Remove", "btn-danger");
    removeBtn.type = "button";
    removeBtn.addEventListener("click", function () {
      removeVolunteer(v.id, v.name);
    });
    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function removeVolunteer(id, name) {
  if (!confirm("Remove volunteer " + name + "?")) {
    return;
  }
  volunteers = volunteers.filter(function (v) {
    return v.id !== id;
  });
  saveData("volunteers", volunteers);
  render();
  showMessage(name + " has been removed.", "success");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var email = document.getElementById("email").value.trim();

  if (name === "" || phone === "" || email === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!/^[0-9+\-\s]{7,16}$/.test(phone)) {
    showMessage("Please enter a valid phone number.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  for (var i = 0; i < volunteers.length; i++) {
    if (volunteers[i].email.toLowerCase() === email.toLowerCase()) {
      showMessage("A volunteer with this email already exists.", "error");
      return;
    }
  }

  volunteers.push({ id: nextId(volunteers), name: name, phone: phone, email: email });
  saveData("volunteers", volunteers);
  render();
  form.reset();
  showMessage(name + " has been added.", "success");
});

render();
