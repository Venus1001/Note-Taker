const express = require("express");
const fs = require("fs");
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/note_apiRoutes")(app);
require("./routes/note_htmlRoutes")(app);

app.listen(PORT, () => {
    console.log(`Server is listening port: ${PORT}`);
})