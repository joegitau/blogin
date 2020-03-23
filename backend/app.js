const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.send("Whats happening!");
});

module.exports = app;
