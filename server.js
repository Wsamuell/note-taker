// local and imported dependents for the app

const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./Develop/db/db.json')

// importing express so we can use in in the project

const app = express();
const PORT = 3001;

// linking the assets so that they are static and not interrupted
app.use(express.static('public'));

// interpreting data to be parsed so we can read it as JSON to POST request
// Middleware
app.use(express.urlencoded({ extended: true }));
// ^^^ request as an object

app.use(express.json());
// ^^^ request as JSON

// routes for HTML 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  });




// start listening
app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});