const path = require("path");
const express = require("express");
const workoutController = require("../controllers/workout");
const app = express();
app.use(express.json());

app.post("/create", workoutController.addWorkout);
app.get("/get-all", workoutController.getWorkouts);

module.exports = app;