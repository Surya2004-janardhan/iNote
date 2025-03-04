const connect_to_mongo = require("./db");
const express = require("express");
const cors = require("cors")

connect_to_mongo();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

const port = 5000;

app.listen(port, function() {
    console.log("Server started on port", port);
})