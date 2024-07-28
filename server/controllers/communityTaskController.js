const CommunityTask = require('../models/CommunityTask');
const CommunityTaskID = require('../models/CommunityTaskID'); // Correctly import the model
const User = require('../models/User');

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
    try {
        const id = await CommunityTaskID.find({})
        const communityTasks = await CommunityTask.find({});
        const json = JSON.parse(JSON.stringify(communityTasks, null, 2));
        if (!communityTasks) {
            return res.status(404).json({ error: 'Community task not found' });
        }
        res.status(200).json(json[id[0].index]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the community task', details: error.message });
    }
};

// New endpoint to get all community tasks
const getAllCommunityTasks = async (req, res) => {
    try {
        const communityTasks = await CommunityTask({});
        const json = JSON.parse(JSON.stringify(communityTasks, null, 2));
        res.status(200).json(communityTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving community tasks', details: error.message });
    }
};

const completeUserCommunityTask = async (req, res) => {
    const {username} = req.body
    try {
        const output = await User.findOne({username})
        const communityTasks = await CommunityTask.find({});
        const json = JSON.parse(JSON.stringify(communityTasks, null, 2));
        if(!output) {
            res.status(404).json("No user")
        }
        output.communityTask = 1
        output.points += json[0].points
        await output.save()
        res.status(200).send(output)
    } catch(e) {
        res.status(404).json("Error: ", e)
    }
}



const updateCommunityTaskID = async () => {
    try {
        // Generate a random number between 1 and 10
        const randomID = Math.floor(Math.random() * 10) + 1;

        // Update the CommunityTaskID document, create if it doesn't exist
        const updatedTaskID = await CommunityTaskID.findOneAndUpdate(
            {},
            { index: randomID }, // Assuming the field to update is named 'id'
            { new: true, upsert: true } // Create the document if it doesn't exist
        );
                const users = await User.find({});
        
                for (const user of users) {
                    console.log(user)
                    if(user.communityTask === 0) {
                        user.streak === 0
                    } else {
                        user.streak += 1
                        user.communityTask = 0
                    }
                    await user.save();
                }
        console.log('CommunityTaskID updated:', updatedTaskID);
    } catch (error) {
        console.error('Error updating CommunityTaskID:', error);
    }
};

module.exports = { addCommunityTask, getCommunityTask, getAllCommunityTasks, updateCommunityTaskID, completeUserCommunityTask};
