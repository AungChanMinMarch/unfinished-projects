keyboard.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    if (!action) {
      if (index === 0) {
        changeVisible(visible_Input, "multi-input");
        writeSingleInput(key);
      } else if (index === 1) {
        changeVisible(visible_Input, "single-input");
        writeSingleInput(key);
      } else if (index == 2) {
        writeMoney(key);
      } else if (index === 3) {
        changeVisible(visible_Input, "enter-key");
        writeMoney(key);
      }
    } else if (action === "d" || action === "r") {
      keyboard.dataset.isSingle = true;
      addNewCol();
      writeSingleInput(key);
      hide(visible_Input);
      if (money) {
        money = null;
      } else {
        colSpan(2);
      }
    } else if (action === "e") {
      if (keyboard.dataset.isSameSingle == "true") sameSingle();
      else notSameSingle();
      saveInPeek(inputTbody_lastLine);
      startNewLine();
    } else if (
      action == "t" ||
      action === "p" ||
      action == "b" ||
      action === "all"
    ) {
      keyboard.dataset.isSingle = false;
      addNewCol();
      colSpan(2);
      writeSingleInput(key); //index+1
      index++;
      hide(visible_Input);
    } else if (action == "power") {
      keyboard.dataset.isSingle = false;
      colSpan(3);
      writeSingleInput(key); //index+1
      index += 2;
      hide(visible_Input);
    } else if (action === "s") {
      if (keyboard.dataset.isSingle == "true") {
        const tds = inputTbody_lastLine.children;
        if (tds.length == 3) {
          keyboard.dataset.isSameSingle = true;
          keyboard.dataset.sameSingleName = tds[1].innerHTML;
          keyboard.dataset.money = tds[2].innerHTML;
        } else if (tds.length == 4) {
          keyboard.dataset.isSameSingle = false;
          keyboard.dataset.money1 = tds[1].innerHTML;
          keyboard.dataset.money2 = tds[3].innerHTML;
        } else {
          alert("this is error");
        }
      }
      saveInPeek(inputTbody_lastLine);
      startNewLine();
    } else if (action === "c") {
      inputTbody_lastLine.remove();
      startNewLine();
    }
    document
      .getElementById("input-display-area")
      .scrollTo(0, document.getElementById("input-display-area").scrollHeight);
  }
});
function sameSingle() {
  addNewCol();
  console.log(keyboard.dataset.sameSingleName);
  inputTbody_lastLine.lastChild.innerHTML += keyboard.dataset.sameSingleName;
  colSpan(2);
  addNewCol();
  inputTbody_lastLine.lastChild.innerHTML += keyboard.dataset.money;
}
function notSameSingle() {
  addNewCol();
  inputTbody_lastLine.lastChild.innerHTML += keyboard.dataset.money1;
  addNewCol();
  inputTbody_lastLine.lastChild.innerHTML += "R";
  addNewCol();
  inputTbody_lastLine.lastChild.innerHTML += keyboard.dataset.money2;
}
var longpress = false;
var presstimer = null;

var cancel = function (e) {
  if (presstimer !== null) {
    clearTimeout(presstimer);
    presstimer = null;
  }
};

var start = function (e) {
  const tr = e.target.closest("tr");
  if (e.type === "click" && e.button !== 0) {
    return;
  }

  if (presstimer === null) {
    presstimer = setTimeout(function () {
      if (confirm("ဖျက်ချင်တာ သေချာပါသလား")) {
        inputTbody.deleteRow(tr.rowIndex);
      }
    }, 500);
  }
  return false;
};

inputTbody.addEventListener("mousedown", start, true);
inputTbody.addEventListener("touchstart", start);
inputTbody.addEventListener("click", cancel);
inputTbody.addEventListener("mouseout", cancel);
inputTbody.addEventListener("touchend", cancel);
inputTbody.addEventListener("touchleave", cancel);
inputTbody.addEventListener("touchcancel", cancel);
