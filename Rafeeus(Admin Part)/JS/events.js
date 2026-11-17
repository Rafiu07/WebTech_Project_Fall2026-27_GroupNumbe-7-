var events = loadData("events");
var orgs = loadData("organizations");
var tableBody = document.getElementById("tableBody");

function orgName(id) {
  for (var i = 0; i < orgs.length; i++) {
    if (orgs[i].id === id) {
      return orgs[i].name;
    }
  }
  return "Unknown";
}

document.getElementById("count").textContent = events.length;

if (events.length === 0) {
  var emptyRow = document.createElement("tr");
  var emptyCell = makeEl("td", "No events found.", "empty");
  emptyCell.colSpan = 7;
  emptyRow.appendChild(emptyCell);
  tableBody.appendChild(emptyRow);
}

events.forEach(function (ev, i) {
  var row = document.createElement("tr");
  row.appendChild(makeEl("td", i + 1));
  row.appendChild(makeEl("td", ev.title));
  row.appendChild(makeEl("td", orgName(ev.orgId)));

  var categoryCell = document.createElement("td");
  categoryCell.appendChild(makeEl("span", ev.category, "badge"));
  row.appendChild(categoryCell);

  row.appendChild(makeEl("td", ev.location));
  row.appendChild(makeEl("td", formatDate(ev.date) + ", " + ev.time));
  row.appendChild(makeEl("td", ev.details));

  tableBody.appendChild(row);
});
