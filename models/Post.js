const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
