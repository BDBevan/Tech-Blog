// routes/home.js
const express = require('express');
const router = express.Router();

// GET route for the home page
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;
