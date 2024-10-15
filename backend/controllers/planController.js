// backend/controllers/planController.js
const Plan = require('../models/Plan');

exports.createPlan = async (req, res) => {
    const { name, duration, price, features } = req.body;

    try {
        const plan = await Plan.create({ name, duration, price, features });
        res.status(201).json({ message: 'Plan created', plan });
    } catch (error) {
        res.status(500).json({ error: 'Error creating plan' });
    }
};


// New function to get all plans
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll(); // Fetch all plans from the database
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching plans' });
    }
};

// New function to edit an existing plan
exports.editPlan = async (req, res) => {
    const { id } = req.params; // Get the plan ID from the request parameters
    const { name, duration, price, features } = req.body; // Get updated data from request body

    try {
        const [updated] = await Plan.update({ name, duration, price, features }, { where: { id } }); // Update the plan

        if (updated) {
            const updatedPlan = await Plan.findByPk(id); // Fetch the updated plan
            return res.status(200).json({ message: 'Plan updated', plan: updatedPlan });
        }
        throw new Error('Plan not found');
    } catch (error) {
        res.status(500).json({ error: 'Error updating plan' });
    }
};
