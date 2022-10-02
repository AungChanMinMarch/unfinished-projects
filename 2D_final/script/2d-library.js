function createCell(colSpan = 1, isMoneyCell) {
  if (colSpan === 0) return;
  const td = document.createElement("td");
  td.colSpan = colSpan;
  inpTbody.lastChild.appendChild(td);
  if (isMoneyCell) td.classList.add("money");
  return td;
}
function addStringTOCell(key) {
  const td = inpTbody.lastChild.lastChild;
  if (td.matches(".money")) td.textContent += key.textContent;
  else td.textContent = key.textContent;
}

function variables(key) {
  const td_length = inpTbody.lastChild.childElementCount;

  if (key.matches(".multi-input")) {
    this.isMoneyCell = false;
    this.new_input_class = "multi-input";
    if (td_length === 0) this.colSpan = 4;
    else this.colSpan = 0;
    return this;
  }
  if (key.matches(".line-input")) {
    this.isMoneyCell = false;
    this.new_input_class = "line-input";
    if (td_length === 1) {
      inpTbody.lastChild.lastChild.colSpan = 2;
      this.colSpan = 2;
    } else if (td_length === 2) this.colSpan = 0;
    else alert("check this condition");
    return this;
  }
  if (td_length === 0) {
    //line or single or double
    this.colSpan = 1;
    this.isMoneyCell = false;
    this.new_input_class = "line-input";
    return this;
  }
  const lastTD = inpTbody.lastChild.lastChild;
  let index = 0;
  for (let i = 0; i < td_length; i++) {
    index += lastTD.colSpan;
  }1`  
  if (td_length === 1) {
    if (lastTD.colSpan == 1) {
      this.colSpan = 1;
      this.isMoneyCell = false;
      this.new_input_class = "single-input";
      return this;
    }
    if (lastTD.colSpan == 4) {
      this.colSpan = 1;
      this.isMoneyCell = true;
      this.new_input_class = "enter";
      return this;
    }
  }
}

var current_input_class = "multi-input";
function changeKeyboardVisible(hideClass, showClass) {
  if (showClass == undefined) return;
  const hideObjs = document.getElementsByClassName(hideClass);
  const showObjs = document.getElementsByClassName(showClass);
  for (let i = 0; i < hideObjs.length; i++) {
    hideObjs[i].style.display = "none";
  }
  for (let i = 0; i < showObjs.length; i++) {
    showObjs[i].style.display = "block";
  }
  current_input_class = showClass;
}
