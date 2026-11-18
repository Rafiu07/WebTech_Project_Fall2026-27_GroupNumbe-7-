


var events = loadData("events", startEvents);



function showEvents() {
  var rows = "";

  for (var i = 0; i < events.length; i++) {
    rows = rows + "<tr>";
    rows = rows + "<td>" + (i + 1) + "</td>";
    rows = rows + "<td>" + events[i].title + "</td>";
    rows = rows + "<td>" + events[i].org + "</td>";
    rows = rows + "<td><span class='badge'>" + events[i].category + "</span></td>";
    rows = rows + "<td>" + events[i].location + "</td>";
    rows = rows + "<td>" + events[i].date + ", " + events[i].time + "</td>";
    rows = rows + "<td>" + events[i].details + "</td>";
    rows = rows + "</tr>";
  }

  if (events.length === 0) {
    rows = "<tr><td colspan='7' class='empty'>No events found.</td></tr>";
  }

  document.getElementById("tableBody").innerHTML = rows;
  document.getElementById("count").textContent = events.length;
}



showEvents();
