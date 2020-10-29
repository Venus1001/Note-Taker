
const fs = require("fs");

module.exports = function (app) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
        if (error) {
            throw error;
        }
        var notes = JSON.parse(data);

        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        app.get("/api/notes/:id", (req, res) => {
            res.json(notes[req.params.id]);
        });

        app.post("/api/notes", function (req, res) {
            let writeNewNotes = req.body;
            notes.push(writeNewNotes);
            addNoteToDb();
        });

        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1)
            addNoteToDb();
        });

        function addNoteToDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), function (error) {
                if (error) throw error;
                return true;
            });
        }
    });

}