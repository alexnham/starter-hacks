const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //id, first, last, username, password, email, tasks -> [], streak
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        task: {
            type: Schema.Types.Mixed,
            ref: "DailyTask",
        },
        status: {
            type: String,
            enum: ['Complete', "Incomplete"],
            default: "Incomplete"
    }
    }],
    streak: {
        type: Number,
        required: true,
    },

}, {timestamps: true})

module.exports = mongoose.model('Users', userSchema);
