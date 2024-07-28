const mongoose = require('mongoose');

const communityTaskIDSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CommunityTaskID', communityTaskIDSchema);
