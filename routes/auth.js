// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET route for sign-up page
router.get('/signup', (req, res) => {
    res.render('signup'); 
});

// POST route for sign-up
router.post('/signup', authController.signup); 

// GET route for login page
router.get('/login', (req, res) => {
    res.render('login'); 
});

// POST route for login
router.post('/login', authController.login); 

// POST route for logout
router.post('/logout', authController.logout); 

module.exports = router;
