const DailyTask = require('../models/DailyTask')
const User = require('../models/User')

const addDailyTask = async (req, res) => {
    const {name, description, points} = req.body
    try {
        const newDailyTask = await DailyTask.create({name, description, points})
        res.status(200).json(newDailyTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}

const resetDailyTask = async (req, res) => {
    const users = await User.find({})
    const json = JSON.parse(JSON.stringify(users, null, 2));
    const dailyTasks = await DailyTask.find({})
    const dailyJson = JSON.parse(JSON.stringify(dailyTasks, null, 2))

    console.log(dailyJson)
    
    for(const index in json) [

        json[index]
    ]
    res.status(200).send("hello world")
}


module.exports = {addDailyTask, resetDailyTask}