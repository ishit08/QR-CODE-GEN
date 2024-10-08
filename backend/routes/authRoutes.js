const express = require('express');
const { register, login } = require('../controllers/authController');
const jwt = require('jsonwebtoken'); // Import JWT for admin token generation

const router = express.Router();

// Admin Credentials
const adminCredentials = {
    username: 'admin',
    password: 'adminpassword' // Make sure to hash this in a real app
};

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Admin Login Route
router.post('/login_mydash', async (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({ message: 'Admin login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Admin Dashboard Route
router.get('/admin/dashboard', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
    } else {
        return res.status(403).json({ message: 'Access denied. Please log in.' });
    }
});

module.exports = router;
