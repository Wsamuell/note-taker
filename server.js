// local and imported dependents for the app

const express = require('express');
const fs = require('fs');
const { request } = require('http');
const path = require('path');
const database = require('./Develop/db/db.json')

// importing express so we can use in in the project

const app = express();
const PORT = 3001;

// linking the assets so that they are static and not interrupted
app.use(express.static('Develop/public'));

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



// routes to return API calls to display prior content from DB
app.route('/api/notes')
.get(function (req, res) {
    res.json(database)
})
.post(function (req, res) {
    let newJSON = (path.join(__dirname, "/Develop/db/db.json"));
    let newNote = req.body;
    
    let notesId = 0;
    for (let i = 0; i < database.length; i++) {
        let note = database[i];
        // make sure that the id for the new notes wil always be larger than the last id used
        if (note.id > notesId) {
            notesId = note.id
        }
    }
    newNote.id = notesId + 1;
    database.push(newNote)
    
    //  retrieving the stored data so that PH can have it displayed in the app
    // cant seem to get the data to be read by the system so that i can pull it into the page
    fs.writeFile(newJSON, JSON.stringify(database), (err) => {
        
        if (err) throw err;
        console.log("New notes saved");
    });
    // display notes on page
    res.json(newNote);

})
// delete route, i don't know if i can get this to work 
// trying to use the ID of each individual note to pull note to be deleted


// app.delete('/api/notes/:id', (res,req) => {
//     let newJSON = (path.join(__dirname, "/Develop/db/db.json"));
//     for (let i = 0; i < database.length; i++) {
//         if (database[i].id == req.params.id){
//             database.splice(i, 1);
//             break;
//         }
//     }
//     fs.writeFile(newJSON, JSON.stringify(database), (err) => {
        
//         if (err) throw err;
//         console.log("notepad deleted!");
//     });
//     res.json(database);

// })


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});




// start listening
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});