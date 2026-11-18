

var volunteers = loadData("volunteers", startVolunteers);
var organizations = loadData("organizations", startOrganizations);
var events = loadData("events", startEvents);
var notices = loadData("notices", startNotices);

document.getElementById("volCount").textContent = volunteers.length;
document.getElementById("orgCount").textContent = organizations.length;
document.getElementById("eventCount").textContent = events.length;
document.getElementById("noticeCount").textContent = notices.length;
