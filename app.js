if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: "config/.env"})
}
const path = require("path");
const express = require("express");
const app = express();
const sequelize = require('./util/database');
const workoutRoutes = require('./routes/workout');

app.use("/workout", workoutRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });