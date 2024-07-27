const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailyTaskSchema = new Schema({
    //id, name, points/score
    name: {
        type: String,
        required
    },
    points: {
        type: Number,
        required
    }

})


module.exports = mongoose.model('DailyTask', dailyTaskSchema);
