
const fs = require("fs");


module.exports = function (app) {
    let noteData = require("../db/db");
    app.get("/api/noteData", function (req, res) {
        res.json(noteData);
    });

    app.get("/api/noteData/:id", (req, res) => {
        const id = req.params.id;
        let found;
        noteData.forEach(note => {
            if (id == note.id) {
                found = note;
                return res.json(note)
            }
        })
        return res.json(false)
    })

    app.post("/api/noteData", function (req, res) {
        const newNote = req.body;
        if (noteData.length === 0) {
            newNote.id = 1
        } else {
            newNote.id = (noteData[noteData.length - 1].id + 1);
        }
        noteData.push(newNote);
        let jsonNotes = JSON.stringify(noteData)
        fs.writeFile("./db/db.json", jsonNotes, function (error) {
            if (error) throw error;
            else {
                console.log("Success!");
            }
        })
        res.json(true)
    });

    app.delete("/api/noteData/:id", (req, res) => {
        const id = req.params.id;
        noteData.forEach((noteId, index) => {
            if (id == noteId.id) {
                noteData.splice(index, 1)
                const notesCopy = noteData.slice();
                let jsonNotes = JSON.stringify(notesCopy)
                fs.writeFile("./db/db.json", jsonNotes, function (error) {
                    if (error) throw error;
                })
            }
        })
        res.json(true);
    })


}