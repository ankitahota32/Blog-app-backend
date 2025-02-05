const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ankitahota3264:ankita123@cluster0.nqjqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
