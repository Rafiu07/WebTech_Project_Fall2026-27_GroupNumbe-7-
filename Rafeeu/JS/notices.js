// =====================================================
// notices.js - the notice board page
// =====================================================

// Get the list of notices
var notices = loadData("notices", startNotices);


// Draw the notices on the page
function showNotices() {
  var html = "";

  for (var i = 0; i < notices.length; i++) {
    html = html + "<div class='notice'>";
    html = html + "<div>";
    html = html + "<h3>" + notices[i].title + "</h3>";
    html = html + "<p>" + notices[i].message + "</p>";
    html = html + "<span class='notice-date'>Posted on " + notices[i].date + "</span>";
    html = html + "</div>";
    html = html + "<button class='btn-danger' onclick='removeNotice(" + i + ")'>Remove</button>";
    html = html + "</div>";
  }

  if (notices.length === 0) {
    html = "<p class='empty'>No notices yet.</p>";
  }

  document.getElementById("noticeList").innerHTML = html;
  document.getElementById("count").textContent = notices.length;
}


// Post a new notice (runs when "Post Notice" is clicked)
function addNotice() {
  var title = document.getElementById("title").value.trim();
  var text = document.getElementById("text").value.trim();

  // Both boxes must be filled in
  if (title === "" || text === "") {
    showMessage("Please fill in the title and the message.", "error");
    return;
  }

  // Today's date, for example "Wed Nov 18 2026"
  var today = new Date().toDateString();

  // unshift puts the new notice at the START of the list, so it shows on top
  notices.unshift({ title: title, message: text, date: today });
  saveData("notices", notices);
  showNotices();

  document.getElementById("title").value = "";
  document.getElementById("text").value = "";
  showMessage("Notice posted.", "success");
}


// Remove a notice (runs when a "Remove" button is clicked)
function removeNotice(index) {
  if (confirm("Remove this notice?") === true) {
    notices.splice(index, 1);   // take 1 item out at this position
    saveData("notices", notices);
    showNotices();
    showMessage("Notice removed.", "success");
  }
}


// When the Post button is clicked, run addNotice
document.getElementById("addBtn").onclick = addNotice;

// Draw the notices when the page opens
showNotices();
