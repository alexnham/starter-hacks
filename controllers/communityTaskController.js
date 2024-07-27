const CommunityTask = require('../models/CommunityTask')
const CommunityTaskID = require('../models/CommunityTaskID')

const addCommunityTask = async (req, res) => {
    console.log(req.body)
    const {name, points, value, goal} = req.body

    try {
        const newCommunityTask = await CommunityTask.create({name, points, value, timesCompleted:0, goal})
        res.status(200).json(newCommunityTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}

const getCommunityTask = async (req, res) => {
    const {name} = req.body

    try {
        const communityTask = await CommunityTask.findOne({name})
        res.status(200).json(communityTask)
    } catch(e) {
        res.status(404).json("Error", e)
    }
}

module.exports = {addCommunityTask, getCommunityTask}