const DailyTask = require('../models/DailyTask')

const addDailyTask = async (req, res) => {
    const {name, points} = req.body

    try {
        const newDailyTask = await CommunityTask.create({name, points, value, timesCompleted:0, goal})
        res.status(200).json(newDailyTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}

module.exports(addDailyTask)