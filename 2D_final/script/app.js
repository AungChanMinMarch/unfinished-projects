var currentPageID = "input-page";
function change(pageID) {
  if (currentPageID !== pageID) {
    document.getElementById(currentPageID).style.zIndex = 0;
    document.getElementById(pageID).style.zIndex = 1;
    currentPageID = pageID;
  }
}

var shouldSave = true;
function save() {
  if (shouldSave) {
    //   localStorage.setItem("input-tbody", inpTbody.innerHTML);
    //   localStorage.setItem("peekTbody", peekTbody.innerHTML);
    //   localStorage.setItem("total", JSON.stringify(total));
    //   localStorage.setItem("index", JSON.stringify(index));
    //   localStorage.setItem("visible_Input", visible_Input);
    alert("သိမ်းထားပြီးပါပြီ။ \r\nကံကောင်းပါစေ။");
    window.close();
  }
}
function clearAll() {
  localStorage.clear();
  alert("ရှင်းလင်းပြီးပါပြီ။");
  shouldSave = false;
  window.location.reload();
}

var onBeforeUnLoadEvent = false;
window.onunload = window.onbeforeunload = function () {
  if (!onBeforeUnLoadEvent) {
    onBeforeUnLoadEvent = true;
    save();
  }
};

window.onload = function () {
  writePeekTbody();
  inpTbody.appendChild(document.createElement("tr"));
};

const inpTbody = document.getElementById("input-tbody");
const keyboard = document.getElementById("keyboard");

keyboard.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const key = e.target;
  const input = key.dataset.input;

  const { colSpan, isMoneyCell, new_input_class } = new variables(key);

  createCell(colSpan, isMoneyCell);
  addStringTOCell(key);
  changeKeyboardVisible(current_input_class, new_input_class);
});
