var currentPageID = "input-page";
var inputTbody_lastLine, index, money;
var saveData = true;

var inputTbody = document.getElementById("input-tbody");
var keyboard = document.getElementById("keyboard");

var visible_Input = "line-input";

function save() {
  if (saveData) {
    localStorage.setItem("input-tbody", inputTbody.innerHTML);
    localStorage.setItem("peekTbody", peekTbody.innerHTML);
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("visible_Input", visible_Input);
    alert("သိမ်းထားပြီးပါပြီ။");
window.close();
  }
}
window.onload = function () {
  if (localStorage.length == 0) {
    startNewLine();
    writePeekTbody();
    total = 0;
  } else {
    inputTbody.innerHTML = localStorage.getItem("input-tbody");
    inputTbody_lastLine = inputTbody.lastChild;
    index = parseInt(localStorage.getItem("index"));
    changeVisible("line-input", localStorage.getItem("visible_Input"));

    peekTbody.innerHTML = localStorage.getItem("peekTbody");
    total = parseInt(localStorage.getItem("total"));
  }
  saveToCalc(0); //call this to display current total money
  saveData = true;
};
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "တကယ်ထွက်လိုပါသလား။";
  save();
  return "သိမ်းထားပြီးပါပြီ။";
});
window.addEventListener("unload", function (e) {
  e.preventDefault();
  e.returnValue = "တကယ်ထွက်လိုပါသလား။";
  save();
  return "သိမ်းထားပြီးပါပြီ။";
});
function clearAll() {
  console.log(localStorage);
  localStorage.clear();
  saveData = false;
  alert("ရှင်းလင်းပြီးပါပြီ။");
  location.reload();
}
function changePage(element) {
  if (element != currentPageID) {
    document.getElementById(currentPageID).style.zIndex = "-1";
    currentPageID = element;
    document.getElementById(element).style.zIndex = "3";
  }
}
var fileLink = null;
function makePdfFile() {
  var text = document.getElementById("send-table").outerHTML;
  let data = new Blob([text], { type: "text/html" });
  if (!fileLink) fileLink = window.URL.createObjectURL(data);
  else window.URL.revokeObjectURL(fileLink);

  var anchor = document.createElement("a");
  anchor.setAttribute("download", "info.html");
  anchor.href = fileLink;
  document.getElementById("test-result").appendChild(anchor);

  // window.requestAnimationFrame(function () {
  //   var event = new MouseEvent("click");
  //   anchor.dispatchEvent(event);
  //   document.body.removeChild(link);
  // });
}
