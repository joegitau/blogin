const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post)
      return res.status(500).json({ message: "Post with given ID not found!" });

    res.status(200).json({ message: "Post successfully fetched!", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) return res.status(500).json({ message: "No posts found!" });

    res.status(200).json({ message: "Posts succesfully fetched!", posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);

    await post.save();
    res.status(201).json({ message: "Post succesfully created!", post });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const fields = Object.keys(req.body);
  const postFields = ["title", "description"];
  const isValidOp = fields.every(fields => postFields.includes(fields));

  if (!isValidOp)
    return res.status(400).json({ message: "Invalid post fields" });

  try {
    const post = await Post.findById({ _id: req.params.id });

    if (!post)
      return res.status(500).json({ message: "Post with given ID not found!" });

    fields.forEach(field => (post[field] = req.body[field]));
    await post.save();

    res.status(200).json({ message: "Post succesfully updated!", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });

    if (!post)
      return res.status(500).json({ message: "Post with given ID not found!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
