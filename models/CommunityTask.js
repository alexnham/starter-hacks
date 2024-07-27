const mongoose = require('mongoose')
const Schema = mongoose.Schema

const communityTaskSchema = new Schema({
    //id, name, points/score, value, timesCompleted, goal
    name: {
        type: String,
        required
    },
    points: {
        type: Number,
        required
    },
    value: {
        type: Number,
        required
    },
    timesCompleted: {
        type: Number,
        required
    },
    goal: {
        type: Number,
        required
    }
})

module.exports = mongoose.model('CommunityTask', communityTaskSchema);
