import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema({
  title: String,
  body: String,
  postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }],
  lastOtpRequest: { type: Date, default: new Date(0) },
  otp: { type: Number, default: Math.random() * 900000 + 100000 },
});

const postSchema = new mongoose.Schema({
  body: String,
  discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Discussion = mongoose.model("Discussion", discussionSchema);

export { Post, User, Discussion };
