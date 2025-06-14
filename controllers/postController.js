const Post = require('../models/Post');

// Show all posts
exports.showAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('pages/posts', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading posts");
    console.log("Fetching posts...");
    console.log(posts);
  }
};

// Admin: Show create form
exports.showCreateForm = (req, res) => {
  res.render('pages/create-post');
};

// Admin: Handle create post
exports.createPost = async (req, res) => {
  const { title, body } = req.body;
  await Post.create({ title, body });
  res.redirect('/posts');
};

// Admin: Show edit form
exports.showEditForm = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('pages/edit-post', { post });
};

// Admin: Handle update
exports.updatePost = async (req, res) => {
  const { title, body } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, body });
  res.redirect('/posts');
};

// Admin: Delete post
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
};

exports.showSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render('pages/single-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading post");
  }
};

