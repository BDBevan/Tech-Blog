// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Sign up function
const signup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        req.session.userId = newUser.id; // Log the user in
        res.redirect('/posts'); // Redirect to posts/dashboard
    } catch (err) {
        res.status(500).json(err);
    }
};

// Log in function
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id; // Log the user in
        res.redirect('/posts'); // Redirect to posts/dashboard
    } else {
        res.status(401).send('Invalid credentials');
    }
};

// Log out function
const logout = (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        console.error('Failed to destroy session:', err);
        return res.status(500).json({ error: 'Failed to log out.' });
      }
      // Clear the cookie if needed
      res.clearCookie('connect.sid'); // Replace 'connect.sid' with your session cookie name if different
      res.redirect('/auth/login'); // Redirect to login or home page
    });
  };
  

module.exports = {
    signup,
    login,
    logout,
};
