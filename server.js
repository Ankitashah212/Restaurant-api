var http = require("http");
var fs = require("fs");
var PORT = 8080;
//var server = http.createServer(handleRequest);
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Set up express app

var app = express();
var PORT = 3000;

// Parse data via express app

//=============================================================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


//  Reservations (DATA)
// =============================================================

var reservations = [
    {
        name: "Yoda",
        phone: 411,
        email: "awesome@cool.org",
        uniqueId: "yoda"
    },
    {
        name: "Joda",
        phone: 911,
        email: "awesome@cool.org",
        uniqueId: "yoda1"
    },
    {
        name: "Koda",
        phone: 111,
        email: "awesome2@cool.org",
        uniqueId: "yoda2"
    }
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
    console.log("app.get('/')");
    res.sendFile(path.join(__dirname, "/view/home.html"));
});

app.get("/reserve", function (req, res) {
    console.log("app.get('/reserve')");
    res.sendFile(path.join(__dirname, "/view/reserve.html"));
});

app.get("/tables", function (req, res) {
    console.log("app.get('/tables')");
    res.sendFile(path.join(__dirname, "/view/tables.html"));
});

// Get all reservations
app.get("/all", function (req, res) {
    console.log("app.get('/all')");
    res.json(reservations);
});

// Search for Specific Reserver (or all reservations) - provides JSON

app.get("/api/:reservations?", function (req, res) {
    console.log("app.get('/:reservations?')");
    var chosen = req.params.reservations;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].uniqueId) {
                return res.json(reservations[i]);
            }
        }
        return res.json(false);
    }
    return res.json(reservations);
});



// Create New Reservations - takes in JSON input

app.post("/api/new", function (req, res) {
    console.log("app.post('/api/new')");
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newreservation = req.body;
    newreservation.uniqueId = newreservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);
});
