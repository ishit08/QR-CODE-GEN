// backend/controllers/planController.js
const Plan = require('../models/plan');

exports.createPlan = async (req, res) => {
  const { name, duration, price, features } = req.body;

  try {
    const plan = await Plan.create({ name, duration, price, features });
    res.status(201).json({ message: 'Plan created', plan });
  } catch (error) {
    res.status(500).json({ error: 'Error creating plan' });
  }
};
