const express = require("express");
const router = express.Router();

// post Model
const Post = require("../../models/post");

// @route   GET api/posts
// @desc    Get All posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route   POST api/posts
// @desc    Create An post
// @access  Public
router.post("/", (req, res) => {
  const { title, body, imgId } = req.body;
  const newPost = new Post({ title, body, imgId });

  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete A post
// @access  Public
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   PATCH api/posts/:id
// @desc    Edit A post
// @access  Public
router.patch("/:id", (req, res) => {
  const { title, body, imgId } = req.body;
  Post.updateOne({ _id: req.params.id }, { $set: { title, body, imgId } })
    .then(data =>
      res.status(200).json({
        success: true,
        post: { _id: req.params.id, title, body, imgId }
      })
    )
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/posts/:id
// @desc    Get A post
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      return res.json(post);
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
