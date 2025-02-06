require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
