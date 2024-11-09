// controllers/postController.js
const { Post, User } = require('../models');

// Create a new post
const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Post.create({
            title,
            content,
            userId: req.session.userId, // Associate with logged-in user
        });
        res.redirect('/posts'); // Redirect to posts/dashboard
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: User,
        });

        // Convert posts to plain JavaScript objects
        const plainPosts = posts.map(post => post.get({ plain: true }));

        // Debugging code: Log the plain posts to the console
        console.log('Plain posts:', plainPosts);

        res.render('dashboard', { posts: plainPosts }); // Pass the plain objects to Handlebars
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
// Get a single post
const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [User, { model: Comment }] // Include User and Comments
        });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('post', { post });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json(err);
    }
};

// Update a post
const updatePost = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Post.update({ title, content }, { where: { id: req.params.id } });
        res.redirect('/posts'); // Redirect to posts/dashboard
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/posts'); // Redirect to posts/dashboard
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
