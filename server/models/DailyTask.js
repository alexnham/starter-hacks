const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailyTaskSchema = new Schema({
    //id, name, points/score
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }

})


module.exports = mongoose.model('DailyTask', dailyTaskSchema);
