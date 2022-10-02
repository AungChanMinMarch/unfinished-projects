const resultArea = document.getElementById("coding-result-area");
const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");

function run(position) {
  document.getElementById("code-playground").style.flexDirection = position;
  resultArea.style.display = " block";
  const resultDoc = resultArea.contentWindow.document;
  resultDoc.open();
  resultDoc.write(
    "<style>" +
      css.value +
      "</style>" +
      html.value +
      "<script>" +
      js.value +
      "</script>"
  );
  resultDoc.close();
}

document.getElementById("show-full-page").onclick = function () {
  // storing
  const code = {};
  if (html.value) code.html = html.value;
  if (css.value) code.css = css.value;
  if (js.value) code.js = js.value;
  codePlaygroundID = window.localStorage.length;
  window.localStorage.setItem(codePlaygroundID, JSON.stringify(code));
  this.href =
    "http://127.0.0.1:5500/code-playground.html? codePlaygroundID=" +
    codePlaygroundID;
};
