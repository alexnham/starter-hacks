const CommunityTask = require('../models/CommunityTask');
const CommunityTaskID = require('../models/CommunityTaskID'); // Correctly import the model
const User = require('../models/User');

const addCommunityTask = async (req, res) => {
    const { name, userContribution, description, points, goal } = req.body;

    try {
        const newCommunityTask = await CommunityTask.create({ name, userContribution, description, points, timesCompleted: 0, goal });
        console.log("POSTED")

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
        console.log("POSTED")
        console.log(id[0].index)
        console.log(json.length)
        console.log(json[id[0].index])
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
        console.log("POSTED")

        res.status(200).json(communityTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving community tasks', details: error.message });
    }
};

const completeUserCommunityTask = async (req, res) => {
    const { username } = req.body
    try {
        const output = await User.findOne({ username })
        const id = await CommunityTaskID.find({})
        const communityTasks = await CommunityTask.find({});
        if (!communityTasks) {
            return res.status(404).json({ error: 'Community task not found' });
        }
        if (!output) {
            res.status(404).json("No user")
        }
        console.log(communityTasks[id[0].index])
        output.communityTask = 1
        output.points += communityTasks[id[0].index].points
        output.streak += 1
        communityTasks[id[0].index].timesCompleted += 1
        await communityTasks[id[0].index].save()
        await output.save()
        console.log("POSTED")
        res.status(200).json({ output: output })
    } catch (e) {
        console.log(e)
        res.status(404).json({ error: e })
    }
}



const updateCommunityTaskID = async () => {
    try {
        // Generate a random number between 0 and 9
        const randomID = Math.floor(Math.random() * 9);
        const communityTaskIDs = await CommunityTaskID.find({});
        const communityTasks = await CommunityTask.find({});

        if (communityTaskIDs.length > 0) {
            const currentIndex = communityTaskIDs[0].index % communityTasks.length;
            communityTasks[currentIndex].timesCompleted = 0;
            await communityTasks[currentIndex].save();
        }

        // Update the CommunityTaskID document, create if it doesn't exist
        const updatedTaskID = await CommunityTaskID.findOneAndUpdate(
            {},
            { index: randomID },
            { new: true, upsert: true } // Create the document if it doesn't exist
        );

        const users = await User.find({});
        for (const user of users) {
            if (user.communityTask === 0) {
                user.streak = 0; // Corrected from '===' to '='
            } else {
                user.communityTask = 0;
            }
            await user.save();
        }

        console.log('CommunityTaskID updated:', updatedTaskID);
    } catch (error) {
        console.error('Error updating CommunityTaskID:', error);
    }
};


module.exports = { addCommunityTask, getCommunityTask, getAllCommunityTasks, updateCommunityTaskID, completeUserCommunityTask };
