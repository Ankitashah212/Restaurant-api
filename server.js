var http = require("http");
var fs = require("fs");
var PORT = 8080;
var server = http.createServer(handleRequest);
var app = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Set up express app

var app = express();
var PORT = 3000;

// Parse data via express app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  (DATA)
// =============================================================
var characters = [
    {
      routeName: "yoda",
      name: "Yoda",
      role: "Jedi Master",
      age: 900,
      forcePoints: 2000
    }
]
