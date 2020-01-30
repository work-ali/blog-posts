const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  imgId: {
    required: true,
    type: Number
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
