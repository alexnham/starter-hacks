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
        unique
    },
    email: {
        type: String,
        required: true,
        unique
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
    first: {
        type: String,
        required: true,
        unique
    },


})

module.exports = mongoose.model('Users', userSchema);
