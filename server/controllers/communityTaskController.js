const CommunityTask = require('../models/CommunityTask')
const CommunityTaskID = require('../models/CommunityTaskID')

const addCommunityTask = async (req, res) => {
    const {name, points, value, goal} = req.body

    try {
        const newCommunityTask = await CommunityTask.create({name, points, value, timesCompleted:0, goal})
        res.status(200).json(newCommunityTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}

module.exports(addCommunityTask)