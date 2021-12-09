const express = require("express");
const workoutController = require("../controllers/workout");
const isAuth = require("../middleware/is-auth");
const app = express();
app.use(express.json());

app.post("/create", isAuth, workoutController.addWorkout);
app.get("/get", isAuth, workoutController.getWorkout);
app.get("/get-all", isAuth, workoutController.getWorkouts);

module.exports = app;