const express = require("express");
const {addNote, getNote, getNotes, editNote, deleteNote} = require("../controllers/note");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, addNote);
app.get("/get", isAuth, getNote);
app.put("/edit", isAuth, editNote);
app.delete("/delete", isAuth, deleteNote);
app.get("/get-all", isAuth, getNotes);

module.exports = app;
