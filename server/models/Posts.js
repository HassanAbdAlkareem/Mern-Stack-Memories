const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  name: { type: String },
  message: String,
  creator: String,
  tags: [String],
  selectfile: { type: String },
  comments: { type: [Object], default: [] },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("post", PostSchema);
