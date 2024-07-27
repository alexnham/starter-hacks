const mongoose = require('mongoose')
const Schema = mongoose.Schema

const communityTaskIDSchema = new Schema({
    //community task id
})

module.exports = mongoose.model('CommunityTaskID', communityTaskIDSchema);
