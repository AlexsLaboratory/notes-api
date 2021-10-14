const Workout = require("../models/workout");

exports.AddWorkout = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  Workout.create({
    title: title,
    body: body
  }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).send({
      error: "Sorry something happened on our side. Please try again"
    })
    console.log(err);
  });
};