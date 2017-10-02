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

// Basic route that sends the requestor first to the Home Page
app.get("/", function (req, res) {
    console.log("app.get('/'). Returning view/home.html");
    res.sendFile(path.join(__dirname, "/view/home.html"));
});

// Reserve route that sends the requestor the Reservations Page
app.get("/reserve", function (req, res) {
    console.log("app.get('/reserve'. Returning view/reserve.html");
    res.sendFile(path.join(__dirname, "/view/reserve.html"));
});

// Tables route that sends the requestor the Tables Page
app.get("/tables", function (req, res) {
    console.log("app.get('/tables'). Returning view/tables.html");
    res.sendFile(path.join(__dirname, "/view/tables.html"));
});

// All route that sends the requestor a JSON Array with All Reservations
app.get("/all", function (req, res) {
    console.log("app.get('/all'). Returning json(reservations)");
    res.json(reservations);
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function (req, res) {
    console.log("app.post('/api/new')");
    res.setHeader('Content-Type', 'application/json');
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    console.log("req.body.length", req.body.length);
    var newReservation = req.body[0];
    console.log("req.body", req.body);
    console.log("newReservation", newReservation);
    console.log("newReservation.uniqueId Before", newReservation.uniqueId);
    newReservation.uniqueId = newReservation.uniqueId.replace(/\s+/g, "").toLowerCase();
    console.log("newReservation.uniqueId After", newReservation.uniqueId);
    
    console.log(newReservation);

    console.log("Pushing New Reservation onto reservations Array");
    reservations.push(newReservation);
    console.log("Returning json(newReservation)");
    res.json(newReservation);
});

// API Route searches for an existing reservation using 'uniqueID'
//sends the requestor an Existing or False if Unique ID Does Not Exist
app.get("/api/:reservations?", function (req, res) {
    console.log("/api/:reservations?")
    var chosen = req.params.reservations;
    console.log("params", req.params);
    var fs = require("fs");
    
    console.log("chosen", chosen);

    if (chosen) {
        console.log("reservations.length", reservations.length);
        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].uniqueId) {
                console.log("Returning json(reservations)");
                return res.json(reservations[i]);
            }
        }
        console.log("Returning json(false)");
        return res.json(false);
    }
    console.log("Returning json(reservations)");
    return res.json(reservations);
});

