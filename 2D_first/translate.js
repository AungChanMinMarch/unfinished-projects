function engToMy(num) {
  var nums = {
    0: "၀",
    1: "၁",
    2: "၂",
    3: "၃",
    4: "၄",
    5: "၅",
    6: "၆",
    7: "၇",
    8: "၈",
    9: "၉",
  };
  var num = num.toString();
  return num.replace(/([0-9])/g, function (key) {
    return nums[key];
  });
}
function myToEng(num) {
  var nums = {
    "၀": "0",
    "၁": "1",
    "၂": "2",
    "၃": "3",
    "၄": "4",
    "၅": "5",
    "၆": "6",
    "၇": "7",
    "၈": "8",
    "၉": "9",
  };
  var num = num.toString();
  return num.replace(/([၀-၉])/g, function (key) {
    return nums[key];
  });
}
function getR(num) {
  var num = num.toString();
  if (num.length == 2) {
    return num[1] + num[0];
  } else console.log("here is error");
}
function eng_Rs(_2d) {
  const engNum = myToEng(_2d);
  return [engNum, getR(engNum)];
}
function eng_Ds(_2d) {
  const engNum = myToEng(_2d);
  return [engNum];
}
function eng_Ms(num, multi) {
  const engNum = myToEng(num);
  var Ms = [];
  var num_t, num_p;

  if (multi == "ထိပ်") {
    num_t = engNum.toString();
    for (let i = 0; i < 10; i++) {
      num_p = i.toString();
      Ms.push(num_t + num_p);
    }
    return Ms;
  } else if (multi == "ပိတ်") {
    num_p = engNum.toString();
    for (let i = 0; i < 10; i++) {
      num_t = i.toString();
      Ms.push(num_t + num_p);
    }
    return Ms;
  } else if (multi == "ဘရိတ်") {
    for (let i = 0; i < 10; i++) {
      num_t = i.toString();
      if (engNum - i >= 0) num_p = (engNum - i).toString();
      else num_p = (engNum - i + 10).toString();
      Ms.push(num_t + num_p);
    }
    return Ms;
  } else if (multi == "အပါ") {
    num_t = engNum.toString();
    for (let i = 0; i < 10; i++) {
      num_p = i.toString();
      Ms.push(num_t + num_p);
    }

    num_p = engNum.toString();
    for (let i = 0; i < 10; i++) {
      if (i != engNum) {
        num_t = i.toString();
        Ms.push(num_t + num_p);
      }
    }
    return Ms;
  } else {
    console.log("multi input error");
    return [];
  }
}
function eng_Ls(lineType) {
  if (lineType == "ပါဝါ") {
    return ["05", "16", "27", "38", "49"];
  } else if (lineType == "အပူး") {
    return ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99"];
  } else if (lineType == "နက္ခတ်") {
    return ["07", "18", "24", "35", "96"];
  } else if (lineType == "ရှမ်းပူး") {
    return ["14", "25", "36", "41", "08"];
  } else {
    console.log("line input error");
    return [];
  }
}
