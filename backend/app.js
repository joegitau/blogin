const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

const posts = require("./routes/posts");

app.use("/api/posts", posts);

mongoose
  .connect("mongodb://localhost/blogin", {
    useFindAndModify: false,
    useUnifiedTopology: false,
    useNewUrlParser: false
  })
  .then(() => console.log("Connected to Mongodb..."))
  .catch(err => console.error("could not connect to mongodb...", err));

module.exports = app;
