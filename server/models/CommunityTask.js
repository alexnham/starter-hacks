const mongoose = require('mongoose')
const Schema = mongoose.Schema

const communityTaskSchema = new Schema({
    //id, name, points/score, value, timesCompleted, goal
    name: {
        type: String,
        required: true
    },
    userContribution:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    points: {
        type: Number,
        required: true
    },
    
    timesCompleted: {
        type: Number,
        required: true
    },
    goal: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('CommunityTask', communityTaskSchema);
