// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Retrieve notes from db.json
app.get("/api/notes", function (req, res) {
  readFileAsync(__dirname + "/db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  readFileAsync(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data);

    data.push(newNote);
    data[data.length - 1].id = data.length - 1;
    writeFileAsync("./db/db.json", JSON.stringify(data));
    res.json(data);
  });
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
