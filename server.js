// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Database
const db = require("./db/db.json");

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Retrieve notes from db.json
app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    console.log("This is Notes", data)
    res.json(JSON.parse(data))
  })
});

app.post("/api/notes", function (req, res) {
  console.log("Note POST method!" + req.body);
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});