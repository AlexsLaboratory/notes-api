if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: "config/.env"})
}
const path = require("path");
const express = require("express");
const app = express();
const sequelize = require('./util/database');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

app.use("/note", noteRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });