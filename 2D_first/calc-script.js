var total, rate;
var sendTable = document.getElementById("send-table");
var sendTr; //current send table row
function saveToCalc(engMoney) {
  total += parseInt(engMoney);
  document.getElementById("total").innerHTML = engToMy(total);
}
function test() {
  rate = parseInt(document.getElementById("rate").value);
  var send = 0;
  var eat = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      var _2dObj = document.getElementById("peek" + i + j);
      var engMoney = parseInt(myToEng(_2dObj.innerHTML));
      if (engMoney > rate) {
        send += engMoney - rate;
        eat += rate;
      } else eat += engMoney;
    }
  }
  document.getElementById("send").innerHTML = send;
  document.getElementById("eat").innerHTML = eat;
}
function addSendTr() {
  sendTr = document.createElement("tr");
  sendTable.appendChild(sendTr);
}
function writeToSend(myanLetter) {
  var td = document.createElement("td");
  sendTr.appendChild(td);
  td.innerHTML = myanLetter;
}
function write_single(_2d, d, r) {
  //write 2d
  if (d) _2d = engToMy(_2d);
  else _2d = engToMy(getR(_2d));
  writeToSend(_2d);

  if (d && r) {
    //send both d and r
    if (d != r) writeToSend(engToMy(d));
    writeToSend("R");
    writeToSend(engToMy(r));
  } else {
    //only one defined(true)
    writeToSend("D");
    if (d) writeToSend(engToMy(d));
    //only d is defined(send/ true)
    else if (r) writeToSend(engToMy(r)); //only d is defined(send/ true)
  }
  addSendTr();
}
function eat_d(_2d, newMoney) {
  var prop = "_" + _2d;
  var money = parseInt(newMoney);
  var total = obj[prop] + money;
  if (total <= rate) {
    obj[prop] = total;
    return false;
  } else {
    obj[prop] = rate;
    return total - rate;
  }
}
function eat_r(_2d, newMoneyd, diffMoneyr) {
  var d, r;
  d = eat_d(_2d, newMoneyd);
  if (diffMoneyr) {
    r = eat_d(getR(_2d), diffMoneyr);
  } else {
    r = eat_d(getR(_2d), newMoneyd);
  }
  if (d || r) write_single(_2d, d, r);
}
function ok() {
  sendTable.innerHTML = "";
  restartCalcTable();
  addSendTr();
  var trs = inputTbody.children;
  for (let i = 0; i < trs.length; i++) {
    var tds = trs[i].children;

    if (tds.length == 2) {
      const newMoney = myToEng(tds[1].innerHTML);
      const Ls = eng_Ls(tds[0].innerHTML);
      if (Ls.length == 5) {
        for (let i = 0; i < Ls.length; i++) {
          const _2d = Ls[i];
          eat_r(_2d, newMoney, false);
        }
      } else {
        //apu(အပူး)
        for (let i = 0; i < Ls.length; i++) {
          const _2d = Ls[i];
          var d = eat_d(_2d, newMoney);
          if (d) write_single(_2d, d, false);
        }
      }
    } else if (tds.length == 3) {
      var newMoney = myToEng(tds[2].innerHTML);
      if (tds[1].innerHTML == "R") {
        var _2d = myToEng(tds[0].innerHTML);
        eat_r(_2d, newMoney, false);
      } else if (tds[1].innerHTML == "D") {
        var _2d = myToEng(tds[0].innerHTML);
        var d = eat_d(_2d, newMoney);
        if (d) write_single(_2d, d, false);
      } else {
        //TODO fiexed for b(ဘရိတ်ဘရိတ်)
        var multi = myToEng(tds[0].innerHTML);
        var multiType = tds[1].innerHTML;
        var _2ds = eng_Ms(multi, multiType);
        for (let i = 0; i < _2ds.length; i++) {
          var _2d = _2ds[i];
          var d = eat_d(_2d, newMoney);
          if (d) write_single(_2d, d, false);
        }
      }
    } else if (tds.length == 4) {
      var _2d = myToEng(tds[0].innerHTML);
      var newMoneyD = myToEng(tds[1].innerHTML);
      var newMoneyR = myToEng(tds[3].innerHTML);
      eat_r(_2d, newMoneyD, newMoneyR);
    }
  }
}
var obj = {};
function restartCalcTable() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      var prop = "_" + i.toString() + j.toString();
      obj[prop] = 0;
    }
  }
}
