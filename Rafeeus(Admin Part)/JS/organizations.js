var orgs = loadData("organizations");
var tableBody = document.getElementById("tableBody");
var countEl = document.getElementById("count");
var form = document.getElementById("addForm");

function render() {
  tableBody.innerHTML = "";
  countEl.textContent = orgs.length;

  if (orgs.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = makeEl("td", "No organizations found.", "empty");
    emptyCell.colSpan = 8;
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    return;
  }

  orgs.forEach(function (o, i) {
    var row = document.createElement("tr");
    row.appendChild(makeEl("td", i + 1));
    row.appendChild(makeEl("td", o.name));
    row.appendChild(makeEl("td", o.regNo));
    row.appendChild(makeEl("td", o.focus));
    row.appendChild(makeEl("td", o.email));
    row.appendChild(makeEl("td", o.phone));
    row.appendChild(makeEl("td", o.address));

    var actionCell = document.createElement("td");
    var removeBtn = makeEl("button", "Remove", "btn-danger");
    removeBtn.type = "button";
    removeBtn.addEventListener("click", function () {
      removeOrg(o.id, o.name);
    });
    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function removeOrg(id, name) {
  if (!confirm("Remove " + name + "? Events posted by this organization will also be removed.")) {
    return;
  }
  orgs = orgs.filter(function (o) {
    return o.id !== id;
  });
  saveData("organizations", orgs);

  // Also remove the events this organization posted
  var events = loadData("events").filter(function (ev) {
    return ev.orgId !== id;
  });
  saveData("events", events);

  render();
  showMessage(name + " has been removed.", "success");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name").value.trim();
  var regNo = document.getElementById("regNo").value.trim();
  var focus = document.getElementById("focus").value;
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();

  if (name === "" || regNo === "" || focus === "" || email === "" || phone === "" || address === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (!/^[0-9+\-\s]{7,16}$/.test(phone)) {
    showMessage("Please enter a valid phone number.", "error");
    return;
  }

  for (var i = 0; i < orgs.length; i++) {
    if (orgs[i].regNo.toLowerCase() === regNo.toLowerCase()) {
      showMessage("An organization with this registration number already exists.", "error");
      return;
    }
  }

  orgs.push({
    id: nextId(orgs),
    name: name,
    regNo: regNo,
    focus: focus,
    email: email,
    phone: phone,
    address: address
  });
  saveData("organizations", orgs);
  render();
  form.reset();
  showMessage(name + " has been added.", "success");
});

render();
