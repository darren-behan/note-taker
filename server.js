// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = require("./db/db.json");

// VIEW ROUTES

// Display notes.html when /notes is accessed
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API ROUTES

// Setup the /api/notes GET route
app.get("/api/notes", function (req, res) {
  // Read the db.json file and return all saved notes as JSON.
  res.json(notes);
});

// Setup the /api/notes POST route
app.post("/api/notes", function (req, res) {
  // Read the db.json file and return all saved notes as JSON.
  const newNote = req.body;
  // Receives a new note, adds it to db.json, then returns the new note.
  notes.push(newNote);
  writeFileAsync("db/db.json", JSON.stringify(notes), function (err) {
    if (err) {
      return console.log(err);
    }
  });
  res.json(newNote);
});

// Deletes a note based on its uniqueId
app.delete("/api/notes/:id", function (req, res) {
  // Stores the Id parameter from the API
  const id = req.params.id;

  // For loop removes the noteDeletedByUser if the Id matches that of the Id from the notes array
  for (let i = 0; i < notes.length; i++) {
    if (id === notes[i].id) {
      noteDeletedByUser = notes.indexOf(notes[i]);
      notes.splice(noteDeletedByUser, 1);
      writeFileAsync("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return res.json(id);
    }
  }
});

// VIEW ROUTES

// Display index.html when all other routes are accessed
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
