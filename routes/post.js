// routes/post.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Render the form to create a new post
router.get('/new', (req, res) => {
    res.render('newPost');
});

// Create a new post
router.post('/', postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post
router.get('/:id', postController.getPostById);

// Update a post
router.put('/:id', postController.updatePost);

// Delete a post
router.delete('/:id', postController.deletePost);

module.exports = router;
