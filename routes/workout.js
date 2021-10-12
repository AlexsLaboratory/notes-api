const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const workoutController = require("../controllers/workouts");

app.post("/create", workoutController.postWorkout);
app.get("/get", workoutController.getWorkouts);

exports.routes = app;