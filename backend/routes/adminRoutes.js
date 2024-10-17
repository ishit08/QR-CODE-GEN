// backend/routes/admin.js
const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { createPlan, getAllPlans, editPlan } = require('../controllers/planController'); // Import editPlan
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only routes
router.get('/users', authenticate, isAdmin, getAllUsers);
router.post('/plans', authenticate, isAdmin, createPlan);
router.get('/plans', authenticate, isAdmin, getAllPlans); // New route for getting all plans
router.put('/plans/:id', authenticate, isAdmin, editPlan); // New route for editing a plan

module.exports = router;
