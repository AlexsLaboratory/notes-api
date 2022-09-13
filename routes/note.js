const express = require("express");
const {addNote, getNote, getNotes, editNote} = require("../controllers/note");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, addNote);
app.get("/get", isAuth, getNote);
app.put("/edit", isAuth, editNote);
app.get("/get-all", isAuth, getNotes);

module.exports = app;
