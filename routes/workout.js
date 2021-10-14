const path = require("path");
const express = require("express");
const workoutController = require("../controllers/workout");
const app = express();
app.use(express.json());

app.post("/create", workoutController.AddWorkout);
// app.get("/get", workoutController.getWorkouts);

module.exports = app;