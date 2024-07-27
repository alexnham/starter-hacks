const DailyTask = require('../models/DailyTask')

const addDailyTask = async (req, res) => {
    const {name, description, points} = req.body

    try {
        const newDailyTask = await DailyTask.create({name, description, points})
        res.status(200).json(newDailyTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}



module.exports = {addDailyTask}