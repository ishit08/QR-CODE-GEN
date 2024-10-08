// backend/routes/admin.js
const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { createPlan } = require('../controllers/planController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only routes
router.get('/users', authenticate, isAdmin, getAllUsers);
router.post('/plans', authenticate, isAdmin, createPlan);

module.exports = router;
