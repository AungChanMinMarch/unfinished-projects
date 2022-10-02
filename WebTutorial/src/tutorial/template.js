var template = document.createElement("template");
template.innerHTML = `
<style>
* {
  box-sizing: border-box!important;
}
:host {
  width: 80%;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  background-color: #222831;
}
#code-playground {
  display: flex;
}
footer {
  display: flex;
  justify-content: space-between;
}
.code-playground-items {
  width: 100%;
  min-width: 0px;
  overflow-y: scroll;
  -ms-overflow-style: none; /*this make the scrollbar invisible for IE*/
  scrollbar-width: none; /*this make the scrollbar invisible for firefox*/
}
/* the following block Hide scrollbar for Chrome, Safari and Opera */
.code-playground-items::-webkit-scrollbar {
  display: none;
}

#coding-result{
  display:none;
  flex-direction: column;
  height: calc(30vh + 68px); /*To adjust height for show result on top and bot*/
  max-height: 238px; /*22.667(label height) * 3 + 170 (texarea height)*/
  background-color : #fff;
  color: #000;
}
#result-console{
  display:none;
  height : 50%;
  overflow-y: scroll;
  -ms-overflow-style: none; /*this make the scrollbar invisible for IE*/
  scrollbar-width: none; /*this make the scrollbar invisible for firefox*/
}
#result-console > div{
  width:100%;
  display:block;
  resize:none;
}
#result-page{
  height: 100%;
}
.coding-area-container {/*position must be relative for copy and reset icon*/
  position: relative;
}
label{
  /*this two line let user be able to click anywhere to run updateFocus function*/
  display : block;
  width:100%;
}
.coding-area {
  display: none;
  width: 100%;
  height: 30vh;
  max-height: 170px;
  resize: none;
  border-left: 6px solid #30475E;
}
.copy-icon {
  background: url(http://127.0.0.1:5500/copy-icon.svg) 50% no-repeat;
  width: 24px;
  height: 24px;
  right: 0;
  top: 0;
  border: none;
  position: absolute;
}
.reload-icon {
  background: url(http://127.0.0.1:5500/reload-icon.svg) 50% no-repeat;
  width: 20px;
  height: 20px;
  right: 25px; /* 24px(copy-icon width) + 1px(for a little space between them)*/
  top: 1px;
  border: none;
  position: absolute;
}
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  overflow: hidden;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0px;
}
</style>
<div id="code-playground">
  <div class="code-playground-items">
    ${addCodingArea("html")}
    ${addCodingArea("css")}
    ${addCodingArea("js")}
  </div>
  <div class="code-playground-items" id="coding-result">
      <iframe
        id="result-page" class="coding-result-area"
        title="result"
        frameborder="0">
      </iframe>
      <div id='console'>Console</div>
      <div id ="result-console" class="coding-result-area">
        <div contentEditable = "true"> </div>
      </div>
  </div>
</div>
<footer>
  See result on
  <div id="left">left</div>
  <div id="right">right</div>
  <div id="top">top</div>
  <div id="bottom">bottom</div>
  <a target="_blank" id="show-full-page">Full</a>
</footer>
`;

function addCodingArea(lang) {
  const LANG = lang.toUpperCase();
  return `
  <!--coding-area-container is needed to position copy and reset icon properly-->
  <div class="coding-area-container">
    <label for="${lang}" id = "${lang + "-btn"}">${LANG}</label>
    <textarea
      id="${lang}"
      class="coding-area"
      placeholder="Double click to write ${LANG}"
    >
    </textarea>
    <div class="icon" id="show_all">
      <span>Show All</span>
      <span>Show focus</span>
    </div>
    <div class="copy-icon icon" id="${"copy-" + lang}">
      <span class="visually-hidden">Copy to Clipboard</span>
    </div>
    <div class="reload-icon icon" id="${"reload-" + lang}">
      <span class="visually-hidden">Reload</span>
    </div>
  </div>
  `;
}

class codeSnippet extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.
    const shadowRoot = this.attachShadow({ mode: "open" });
    const doc = this.shadowRoot;
    doc.appendChild(template.content.cloneNode(true));

    const resultArea = doc.getElementById("result-page");
    const html = doc.getElementById("html");
    const css = doc.getElementById("css");
    const js = doc.getElementById("js");

    let focus = this.getAttribute("data-focus");
    doc.getElementById(focus).style.display = "block";

    doc.getElementById("html-btn").onclick = () => {
      updateFocus("html");
    };
    doc.getElementById("css-btn").onclick = () => {
      updateFocus("css");
    };
    doc.getElementById("js-btn").onclick = () => {
      updateFocus("js");
    };
    function updateFocus(lang) {
      doc.getElementById(focus).style.display = "none";
      doc.getElementById(lang).style.display = "block";
      focus = lang;
    }

    //copy section
    doc.getElementById("copy-html").onclick = () => {
      copyToClipboard(html);
    };
    doc.getElementById("copy-css").onclick = () => {
      copyToClipboard(css);
    };
    doc.getElementById("copy-js").onclick = () => {
      copyToClipboard(js);
    };
    function copyToClipboard(el) {
      navigator.clipboard.writeText(el.value).then(
        function () {
          /* clipboard successfully set */
          console.log("copied successfully");
        },
        function () {
          /* clipboard write failed */
          el.select();
          el.setSelectionRange(0, 99999); /* For mobile devices */

          /* Copy the text inside the text field */
          document.execCommand("copy");
        }
      );
    }

    //reload section
    //get and store the original codes(value)
    const c = this.children;
    const htmlValue = getValue("html", c);
    const cssValue = getValue("css", c);
    const jsValue = getValue("js", c);
    function getValue(lang, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].getAttribute("data-type") == lang) return arr[i].innerHTML;
      }
      return "";
    }
    //loading for the first time
    html.value = htmlValue;
    css.value = cssValue;
    js.value = jsValue;
    //reloading on click event
    doc.getElementById("reload-html").onclick = () => {
      html.value = htmlValue;
    };
    doc.getElementById("reload-css").onclick = () => {
      css.value = cssValue;
    };
    doc.getElementById("reload-js").onclick = () => {
      js.value = jsValue;
    };

    var myConsole = doc.getElementById("result-console");
    doc.getElementById("console").onclick = function () {
      myConsole.style.display = "block";
    };
    resultArea.contentWindow.console.log = function (message) {
      var log = document.createElement("div");
      log.contentEditable = "false";
      log.innerHTML =
        typeof message == "object" ? JSON.stringify(message) : message;
      myConsole.insertBefore(log, myConsole.lastElementChild);
    };

    // footer section
    doc.getElementById("left").onclick = () => {
      run("row-reverse");
    };
    doc.getElementById("right").onclick = () => {
      run("row");
    };
    doc.getElementById("top").onclick = () => {
      run("column-reverse");
    };
    doc.getElementById("bottom").onclick = () => {
      run("column");
    };
    function run(position) {
      doc.getElementById("code-playground").style.flexDirection = position;
      doc.getElementById("coding-result").style.display = "flex";
      const resultDoc = resultArea.contentWindow.document;
      resultDoc.open();
      resultDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style>${css.value}</style>
          </head>
          <body>
            ${html.value}
            <script> ${js.value}</script>
          </body>
        </html>
      `);
      resultDoc.close();
    }

    doc.getElementById("show-full-page").onclick = function () {
      // storing
      const code = {};
      if (html.value) code.html = html.value;
      if (css.value) code.css = css.value;
      if (js.value) code.js = js.value;

      let codePlaygroundID = window.localStorage.length;
      window.localStorage.setItem(codePlaygroundID, JSON.stringify(code));
      this.href =
        "http://127.0.0.1:5500/code-playground.html? codePlaygroundID=" +
        codePlaygroundID;
    };
  }
  connectedCallback() {
    console.log("added");
  }
}
window.customElements.define("code-snippet", codeSnippet);
console.log(console.log);
