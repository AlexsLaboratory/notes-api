const path = require("path");
const express = require("express");
const app = express();
const workoutData = require("./routes/workout");

app.use("/workout", workoutData.routes);

app.listen(3000);