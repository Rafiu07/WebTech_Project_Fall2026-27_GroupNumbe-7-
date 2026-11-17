var notices = loadData("notices");
var listEl = document.getElementById("noticeList");
var countEl = document.getElementById("count");
var form = document.getElementById("addForm");

function render() {
  listEl.innerHTML = "";
  countEl.textContent = notices.length;

  if (notices.length === 0) {
    listEl.appendChild(makeEl("p", "No notices yet.", "empty"));
    return;
  }

  notices.forEach(function (n) {
    var box = document.createElement("div");
    box.className = "notice";

    var content = document.createElement("div");
    content.appendChild(makeEl("h3", n.title));
    content.appendChild(makeEl("p", n.message));
    content.appendChild(makeEl("span", "Posted on " + formatDate(n.date), "notice-date"));

    var removeBtn = makeEl("button", "Remove", "btn-danger");
    removeBtn.type = "button";
    removeBtn.addEventListener("click", function () {
      removeNotice(n.id, n.title);
    });

    box.appendChild(content);
    box.appendChild(removeBtn);
    listEl.appendChild(box);
  });
}

function removeNotice(id, title) {
  if (!confirm("Remove the notice \"" + title + "\"?")) {
    return;
  }
  notices = notices.filter(function (n) {
    return n.id !== id;
  });
  saveData("notices", notices);
  render();
  showMessage("Notice removed.", "success");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var title = document.getElementById("title").value.trim();
  var text = document.getElementById("text").value.trim();

  if (title === "" || text === "") {
    showMessage("Please fill in the title and the message.", "error");
    return;
  }

  // newest notice goes on top
  notices.unshift({ id: nextId(notices), title: title, message: text, date: todayString() });
  saveData("notices", notices);
  render();
  form.reset();
  showMessage("Notice posted.", "success");
});

render();
