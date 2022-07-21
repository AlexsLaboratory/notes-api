const express = require("express");
const {addNote, getNote, getNotes} = require("../controllers/note");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, addNote);
app.get("/get", isAuth, getNote);
app.get("/get-all", isAuth, getNotes);

module.exports = app;