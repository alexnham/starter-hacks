const CommunityTaskID = require('../models/CommunityTaskID');

const updateCommunityTaskID = async () => {
    try {
        // Generate a random number between 1 and 10
        const randomID = Math.floor(Math.random() * 10) + 1;

        // Update the CommunityTaskID document, create if it doesn't exist
        const updatedTaskID = await CommunityTaskID.findOneAndUpdate(
            {},
            { id: randomID }, // Assuming the field to update is named 'id'
            { new: true, upsert: true } // Create the document if it doesn't exist
        );

        console.log('CommunityTaskID updated:', updatedTaskID);
    } catch (error) {
        console.error('Error updating CommunityTaskID:', error);
    }
};

module.exports = { updateCommunityTaskID };
