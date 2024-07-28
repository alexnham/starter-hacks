const CommunityTask = require('../models/CommunityTask');

const addCommunityTask = async (req, res) => {
    console.log(req.body);
    const { name, userContribution, description, points, goal } = req.body;

    try {
        const newCommunityTask = await CommunityTask.create({ name, userContribution, description, points, timesCompleted: 0, goal });
        res.status(201).json(newCommunityTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the community task', details: error.message });
    }
};

const getCommunityTask = async (req, res) => {
    const { name } = req.body;
    try {
        const communityTask = await CommunityTask.findOne({ name });
        if (!communityTask) {
            return res.status(404).json({ error: 'Community task not found' });
        }
        res.status(200).json(communityTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the community task', details: error.message });
    }
};

// New endpoint to get all community tasks
const getAllCommunityTasks = async (req, res) => {
    try {
        const communityTasks = await CommunityTask.find({});
        res.status(200).json(communityTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving community tasks', details: error.message });
    }
};

module.exports = { addCommunityTask, getCommunityTask, getAllCommunityTasks };
