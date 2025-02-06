const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./schema/mongoUser");
const Post = require("./schema/mongoPost");
const mongoose = require('mongoose');


const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {
    res.send("Server is running");
})

app.post("/", async (req, res) => { //Login API

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            res.json({ status: "exist", userId: user._id })// change made here
        }
        else {
            res.json({ status: "Does not exist" })
        }
    }
    catch {
        res.json({ status: "Does not exist" });
    }
})

app.post("/signup", async (req, res) => { //SignUp API

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            res.json({ status: "exist" });// change made here
        }
        else {
            const newUser = await User.create({ email: email, password: password })
            res.json({ status: "User created successfully", userId: newUser._id });//change made here
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
})

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content, author, userId } = req.body;
  try {
    const newPost = new Post({ title, content, author, userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

app.get("/posts/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching posts for userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    if (!posts.length) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user-specific posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting post with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});