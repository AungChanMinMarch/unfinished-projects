function bark() {
    console.log("woof !");
}

bark.animal = "dog";

// var http = require("http"); // Import Node.js core module
// var fs = require("fs");

// var server = http.createServer(function (req, res) {
//     console.log(req.url);
//     //create web server
//     if (req.url == "/") {
//         //check the URL of the current request

//         // set response header
//         res.writeHead(200, { "Content-Type": "text/html" });

//         // set response content
//         // res.write("<html><body><p>This is home Page.</p></body></html>");

//         // res.end();
//         fs.readFile("index.html", "UTF-8", (html) => {
//             res.write(html);
//             res.end();
//         });
//     } else if (req.url == "/student") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write("<html><body><p>This is student Page.</p></body></html>");
//         res.end();
//     } else if (req.url == "/admin") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write("<html><body><p>This is admin Page.</p></body></html>");
//         res.end();
//     } else res.end("Invalid Request!");
// });

// server.listen(5000); //6 - listen for any incoming requests

// console.log("Node.js web server at port 5000 is running..");
