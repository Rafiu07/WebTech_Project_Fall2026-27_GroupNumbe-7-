// =====================================================
// app.js - shared code for all admin pages
// (login check, dummy data, saving data, small helpers)
// =====================================================

// 1) Login check: if the admin is not logged in, go back to the login page
if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// 2) Dummy data (used only the first time the pages are opened)
var SEED = {
  volunteers: [
    { id: 1, name: "Rahim Uddin",    phone: "01712-345678", email: "rahim.uddin@example.com" },
    { id: 2, name: "Nusrat Jahan",   phone: "01819-234567", email: "nusrat.jahan@example.com" },
    { id: 3, name: "Tanvir Ahmed",   phone: "01911-456789", email: "tanvir.ahmed@example.com" },
    { id: 4, name: "Farhana Akter",  phone: "01615-678901", email: "farhana.akter@example.com" },
    { id: 5, name: "Mehedi Hasan",   phone: "01511-890123", email: "mehedi.hasan@example.com" },
    { id: 6, name: "Sadia Islam",    phone: "01711-901234", email: "sadia.islam@example.com" },
    { id: 7, name: "Arif Hossain",   phone: "01844-112233", email: "arif.hossain@example.com" },
    { id: 8, name: "Mim Chowdhury",  phone: "01955-667788", email: "mim.chowdhury@example.com" }
  ],

  organizations: [
    { id: 1, name: "Hope Foundation Bangladesh", regNo: "NGO-2015-0142", focus: "Education",
      email: "contact@hopefoundation.example.com", phone: "01700-111222",
      address: "House 12, Road 5, Dhanmondi, Dhaka" },
    { id: 2, name: "LifeLine Blood Network", regNo: "NGO-2012-0087", focus: "Blood Donation",
      email: "info@lifeline.example.com", phone: "01800-222333",
      address: "45 Mirpur Road, Dhaka" },
    { id: 3, name: "Green Earth Initiative", regNo: "NGO-2018-0310", focus: "Environment",
      email: "hello@greenearth.example.com", phone: "01900-333444",
      address: "22 Agrabad C/A, Chattogram" },
    { id: 4, name: "Shanti Health Care Trust", regNo: "NGO-2010-0054", focus: "Healthcare",
      email: "care@shanti.example.com", phone: "01600-444555",
      address: "8 Zindabazar, Sylhet" },
    { id: 5, name: "Rising Sun Youth Society", regNo: "NGO-2019-0421", focus: "Youth Development",
      email: "team@risingsun.example.com", phone: "01500-555666",
      address: "17 KDA Avenue, Khulna" }
  ],

  events: [
    { id: 1, orgId: 2, title: "Emergency Blood Donation Drive", category: "Blood Donation Campaign",
      location: "Dhaka Medical College Gate, Dhaka", date: "2026-11-22", time: "09:00 AM",
      details: "Open to donors aged 18-55. Free health check-up for every donor." },
    { id: 2, orgId: 1, title: "Free Evening School for Street Children", category: "Free Education Campaign",
      location: "Kamrangirchar Community Hall, Dhaka", date: "2026-11-20", time: "05:00 PM",
      details: "Free classes and study materials for children aged 6 to 14." },
    { id: 3, orgId: 4, title: "Free Eye and General Medical Camp", category: "Free Medical Camp",
      location: "Zindabazar Community Clinic, Sylhet", date: "2026-11-28", time: "10:00 AM",
      details: "Free check-up and medicine for low-income families." },
    { id: 4, orgId: 3, title: "Tree Plantation Day", category: "Tree Plantation",
      location: "Foy's Lake Road, Chattogram", date: "2026-12-05", time: "08:00 AM",
      details: "1,000 saplings will be planted. Volunteers should bring water bottles." },
    { id: 5, orgId: 5, title: "Winter Clothes Distribution", category: "Winter Relief",
      location: "Khulna Railway Station Area, Khulna", date: "2026-12-10", time: "04:00 PM",
      details: "Blankets and warm clothes for families in need." },
    { id: 6, orgId: 3, title: "Beach Cleanup Drive", category: "Cleanup Drive",
      location: "Patenga Sea Beach, Chattogram", date: "2026-12-12", time: "07:30 AM",
      details: "Gloves and bags provided. Open to all volunteers." },
    { id: 7, orgId: 5, title: "Basic Computer and Freelancing Workshop", category: "Skill Training",
      location: "Youth Training Center, Khulna", date: "2026-12-15", time: "03:00 PM",
      details: "Free 1-day workshop for students and unemployed youth." }
  ],

  notices: [
    { id: 1, title: "Volunteer Orientation Day",
      message: "All new volunteers must attend the orientation on 20 Nov at 10:00 AM.",
      date: "2026-11-10" },
    { id: 2, title: "Organization Document Renewal",
      message: "Partner organizations must submit updated registration documents by 30 Nov.",
      date: "2026-11-08" },
    { id: 3, title: "Winter Campaign Planning",
      message: "Organizations planning winter relief events should post them by 1 Dec.",
      date: "2026-11-12" }
  ]
};

// 3) Load and save data in the browser (so changes stay when you switch pages)
function saveData(key, list) {
  try {
    localStorage.setItem("ngo_" + key, JSON.stringify(list));
  } catch (e) {}
}

function loadData(key) {
  var saved = null;
  try {
    saved = localStorage.getItem("ngo_" + key);
  } catch (e) {}

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }

  var copy = JSON.parse(JSON.stringify(SEED[key]));
  saveData(key, copy);
  return copy;
}

function nextId(list) {
  var max = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].id > max) {
      max = list[i].id;
    }
  }
  return max + 1;
}

// 4) Small helpers
function makeEl(tag, text, className) {
  var el = document.createElement(tag);
  if (text !== undefined && text !== null) {
    el.textContent = String(text);
  }
  if (className) {
    el.className = className;
  }
  return el;
}

function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatDate(value) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var parts = String(value).split("-");
  if (parts.length !== 3) {
    return value;
  }
  return parseInt(parts[2], 10) + " " + months[parseInt(parts[1], 10) - 1] + " " + parts[0];
}

function todayString() {
  var d = new Date();
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return d.getFullYear() + "-" + month + "-" + day;
}

function logout() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// 5) Connect the Logout button in the nav bar (it has id="logoutBtn")
document.addEventListener("DOMContentLoaded", function () {
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
