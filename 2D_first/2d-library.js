function startNewLine() {
  changeVisible(visible_Input, "line-input");
  inputTbody_lastLine = document.createElement("tr");
  inputTbody.appendChild(inputTbody_lastLine);
  index = 0;
  money = null;
  addNewCol();
}
function changeVisible(hide, show) {
  const hideObjs = document.getElementsByClassName(hide);
  const showObjs = document.getElementsByClassName(show);
  for (let i = 0; i < hideObjs.length; i++) {
    hideObjs[i].style.visibility = "visible";
    hideObjs[i].style.display = "none";
  }
  for (let i = 0; i < showObjs.length; i++) {
    showObjs[i].style.display = "block";
  }
  visible_Input = show;
  console.log(visible_Input);
}
function hide(hide) {
  const hideObjs = document.getElementsByClassName(hide);
  console.log(hide);
  for (let i = 0; i < hideObjs.length; i++) {
    hideObjs[i].style.visibility = "hidden";
  }
}
function addNewCol() {
  inputTbody_lastLine.appendChild(document.createElement("td"));
}
function colSpan(number) {
  inputTbody_lastLine.lastChild.setAttribute("colspan", number.toString());
}

function writeSingleInput(input) {
  index++;
  inputTbody_lastLine.lastChild.innerHTML += input.innerHTML;
}
function writeMoney(input) {
  if (money == null) {
    money = document.createElement("td");
    inputTbody_lastLine.appendChild(money);
  }
  if (money.innerHTML == 0 && input.innerHTML == "၀") return;
  money.innerHTML += input.innerHTML;
}

function writePeekTbody() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let tr = document.createElement("tr");
      peekTbody.appendChild(tr);

      const td = document.createElement("td");
      tr.appendChild(td);
      td.innerHTML = engToMy(i) + engToMy(j);

      const tdMoney = document.createElement("td");
      tr.appendChild(tdMoney);
      tdMoney.id = "peek" + i + j;
      tdMoney.innerHTML = "၀";
    }
  }
}
