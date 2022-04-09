const express = require("express");
const noteController = require("../controllers/note");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, noteController.addNote);
app.get("/get", isAuth, noteController.getNote);
app.get("/get-all", isAuth, noteController.getNotes);

module.exports = app;