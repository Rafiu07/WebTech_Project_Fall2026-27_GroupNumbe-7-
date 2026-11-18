// =====================================================
// app.js - shared by every admin page
// (it is loaded at the bottom of each admin page)
// =====================================================


// PART 1: Login check
// If the admin has not logged in, send them back to the login page.
if (sessionStorage.getItem("loggedIn") !== "yes") {
  window.location.href = "login.html";
}


// PART 2: Logout button
function logout() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").onclick = logout;


// PART 3: Saving and loading data
// The browser keeps our lists so they are still there on the next page.
function saveData(name, list) {
  localStorage.setItem("admin_" + name, JSON.stringify(list));
}

function loadData(name, startingList) {
  var saved = localStorage.getItem("admin_" + name);

  // Nothing saved yet? Use the starting (dummy) list.
  if (saved === null) {
    return startingList;
  }

  return JSON.parse(saved);
}


// PART 4: Show a message in the message box
// type is "error" (red) or "success" (green)
function showMessage(text, type) {
  var box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}


// PART 5: Starting (dummy) data
var startVolunteers = [
  { name: "Rahim Uddin",   phone: "01712-345678", email: "rahim.uddin@example.com" },
  { name: "Nusrat Jahan",  phone: "01819-234567", email: "nusrat.jahan@example.com" },
  { name: "Tanvir Ahmed",  phone: "01911-456789", email: "tanvir.ahmed@example.com" },
  { name: "Farhana Akter", phone: "01615-678901", email: "farhana.akter@example.com" },
  { name: "Mehedi Hasan",  phone: "01511-890123", email: "mehedi.hasan@example.com" },
  { name: "Sadia Islam",   phone: "01711-901234", email: "sadia.islam@example.com" },
  { name: "Arif Hossain",  phone: "01844-112233", email: "arif.hossain@example.com" },
  { name: "Mim Chowdhury", phone: "01955-667788", email: "mim.chowdhury@example.com" }
];

var startOrganizations = [
  {
    name: "Hope Foundation Bangladesh",
    regNo: "NGO-2015-0142",
    focus: "Education",
    email: "contact@hopefoundation.example.com",
    phone: "01700-111222",
    address: "House 12, Road 5, Dhanmondi, Dhaka"
  },
  {
    name: "LifeLine Blood Network",
    regNo: "NGO-2012-0087",
    focus: "Blood Donation",
    email: "info@lifeline.example.com",
    phone: "01800-222333",
    address: "45 Mirpur Road, Dhaka"
  },
  {
    name: "Green Earth Initiative",
    regNo: "NGO-2018-0310",
    focus: "Environment",
    email: "hello@greenearth.example.com",
    phone: "01900-333444",
    address: "22 Agrabad C/A, Chattogram"
  },
  {
    name: "Shanti Health Care Trust",
    regNo: "NGO-2010-0054",
    focus: "Healthcare",
    email: "care@shanti.example.com",
    phone: "01600-444555",
    address: "8 Zindabazar, Sylhet"
  },
  {
    name: "Rising Sun Youth Society",
    regNo: "NGO-2019-0421",
    focus: "Youth Development",
    email: "team@risingsun.example.com",
    phone: "01500-555666",
    address: "17 KDA Avenue, Khulna"
  }
];

// Each event has an "org" - the name of the organization that posted it.
var startEvents = [
  {
    title: "Emergency Blood Donation Drive",
    org: "LifeLine Blood Network",
    category: "Blood Donation Campaign",
    location: "Dhaka Medical College Gate, Dhaka",
    date: "22 Nov 2026",
    time: "09:00 AM",
    details: "Open to donors aged 18-55. Free health check-up for every donor."
  },
  {
    title: "Free Evening School for Street Children",
    org: "Hope Foundation Bangladesh",
    category: "Free Education Campaign",
    location: "Kamrangirchar Community Hall, Dhaka",
    date: "20 Nov 2026",
    time: "05:00 PM",
    details: "Free classes and study materials for children aged 6 to 14."
  },
  {
    title: "Free Eye and General Medical Camp",
    org: "Shanti Health Care Trust",
    category: "Free Medical Camp",
    location: "Zindabazar Community Clinic, Sylhet",
    date: "28 Nov 2026",
    time: "10:00 AM",
    details: "Free check-up and medicine for low-income families."
  },
  {
    title: "Tree Plantation Day",
    org: "Green Earth Initiative",
    category: "Tree Plantation",
    location: "Foy's Lake Road, Chattogram",
    date: "5 Dec 2026",
    time: "08:00 AM",
    details: "1,000 saplings will be planted. Volunteers should bring water bottles."
  },
  {
    title: "Winter Clothes Distribution",
    org: "Rising Sun Youth Society",
    category: "Winter Relief",
    location: "Khulna Railway Station Area, Khulna",
    date: "10 Dec 2026",
    time: "04:00 PM",
    details: "Blankets and warm clothes for families in need."
  },
  {
    title: "Beach Cleanup Drive",
    org: "Green Earth Initiative",
    category: "Cleanup Drive",
    location: "Patenga Sea Beach, Chattogram",
    date: "12 Dec 2026",
    time: "07:30 AM",
    details: "Gloves and bags provided. Open to all volunteers."
  },
  {
    title: "Basic Computer and Freelancing Workshop",
    org: "Rising Sun Youth Society",
    category: "Skill Training",
    location: "Youth Training Center, Khulna",
    date: "15 Dec 2026",
    time: "03:00 PM",
    details: "Free 1-day workshop for students and unemployed youth."
  }
];

var startNotices = [
  {
    title: "Volunteer Orientation Day",
    message: "All new volunteers must attend the orientation on 20 Nov at 10:00 AM.",
    date: "10 Nov 2026"
  },
  {
    title: "Organization Document Renewal",
    message: "Partner organizations must submit updated registration documents by 30 Nov.",
    date: "8 Nov 2026"
  },
  {
    title: "Winter Campaign Planning",
    message: "Organizations planning winter relief events should post them by 1 Dec.",
    date: "12 Nov 2026"
  }
];
