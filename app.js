if (process.env.NODE_ENV !== "production") {
  require("dotenv-defaults").config({
    path: "config/.env",
    encoding: "utf8",
    defaults: "config/.env.defaults"
  })
}
const path = require("path");
const express = require("express");
const app = express();
const errorHandler = require("./util/error");
const sequelize = require('./util/database');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');

app.use("/note", noteRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then(result => {
    app.listen(process.env.HTTP_PORT);
  })
  .catch(err => {
    console.log(err);
  });