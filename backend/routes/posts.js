const express = require("express");
const router = express.Router();

const posts = [
  {
    id: "ajdshig443",
    title: "Post - server",
    description: "This is some post from the server"
  },
  {
    id: "aqewtuqy5y3",
    title: "Post 2 - server",
    description: "This is some post from the server"
  },
  {
    id: "ajsdkfgjafh35qy",
    title: "Post 3 - server",
    description: "This is some post from the server"
  },
  {
    id: "ahfggqt3",
    title: "Post 4 - server",
    description: "This is some post from the server"
  }
];

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Posts fetched succesfully.", posts });
});

router.post("/", (req, res, next) => {
  const post = req.body;
  console.log(post);

  res.status(201).json({ message: "Post succesfully created!", post });
});

module.exports = router;
