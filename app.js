if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: "config/.env"})
}
const path = require("path");
const express = require("express");
const app = express();
import errorHandler from "./util/error";
const sequelize = require('./util/database');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 80;

app.use("/note", noteRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });