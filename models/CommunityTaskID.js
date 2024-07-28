const mongoose = require('mongoose')
const Schema = mongoose.Schema

const communityTaskIDSchema = new Schema({
    //community task id
    index: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('CommunityTaskID', communityTaskIDSchema);
