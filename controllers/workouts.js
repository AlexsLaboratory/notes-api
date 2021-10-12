const Workout = require("../models/workouts");

exports.postWorkout = (req, res, next) => {
  const workout = new Workout(req.body.name, req.body.description);
  workout.save();
  res.send(workout);
}

exports.getWorkouts = (req, res, next) => {
  const workouts = Workout.fetchAll();
  res.send(workouts);
}