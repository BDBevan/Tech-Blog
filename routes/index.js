// routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const postRoutes = require('./post'); 
const homeRoutes = require('./home'); 

// Use the routes
router.use('/', homeRoutes); 
router.use('/auth', authRoutes);
router.use('/posts', postRoutes); 

module.exports = router;
