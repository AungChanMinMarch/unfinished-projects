const head = document.getElementById("peek-nav-bar");
for (let i = 0; i < 10; i++) {
  const anchor = document.createElement("a");
  head.appendChild(anchor);
  anchor.href = "#peek" + i.toString() + 0;
  anchor.innerHTML = engToMy(i);
}
const peekTbody = document.getElementById("peek-tbody");

function saveInPeek(input) {
  const tds = input.children;
  if (tds.length == 2) {
    const newMoney = myToEng(input.lastChild.innerHTML);
    const Ls = eng_Ls(tds[0].innerHTML);
    if (Ls.length == 5) {
      for (let i = 0; i < Ls.length; i++) {
        const _2d = Ls[i];
        addMoney(eng_Rs(_2d), newMoney);
      }
    } //apu(အပူး)
    else addMoney(Ls, newMoney);
  } else if (tds.length == 3) {
    const newMoney = myToEng(input.lastChild.innerHTML);
    if (tds[1].innerHTML == "R") {
      const _2d = myToEng(tds[0].innerHTML);
      addMoney(eng_Rs(_2d), newMoney);
    } else if (tds[1].innerHTML == "D") {
      const _2d = myToEng(tds[0].innerHTML);
      addMoney(eng_Ds(_2d), newMoney);
    } else {
      const multi = myToEng(tds[0].innerHTML);
      const multiType = tds[1].innerHTML;
      addMoney(eng_Ms(multi, multiType), newMoney);
    }
  } else if (tds.length == 4) {
    const _2d = myToEng(tds[0].innerHTML);
    let newMoney = myToEng(tds[1].innerHTML);
    addMoney(eng_Ds(_2d), newMoney);
    const r_2d = _2d[1] + _2d[0];
    newMoney = myToEng(tds[3].innerHTML);
    addMoney(eng_Ds(r_2d), newMoney);
  }
}

function addMoney(_2ds, money) {
  console.log(_2ds);
  for (let i = 0; i < _2ds.length; i++) {
    const id = "peek" + _2ds[i];
    const moneyOf2d = document.getElementById(id);
    const oldMoney = myToEng(moneyOf2d.innerHTML);
    const totalMoney = parseInt(oldMoney) + parseInt(money);
    moneyOf2d.innerHTML = engToMy(totalMoney);
    saveToCalc(money);
  }
}
