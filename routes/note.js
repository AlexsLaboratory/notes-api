const express = require("express");
const {addNote, getNote, getNotes, updateNote} = require("../controllers/note");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, addNote);
app.get("/get", isAuth, getNote);
app.put("/update", isAuth, updateNote);
app.get("/get-all", isAuth, getNotes);

module.exports = app;
