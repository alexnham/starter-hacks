const DailyTask = require('../models/DailyTask')
const User = require('../models/User')

const addDailyTask = async (req, res) => {
    const {name, description, points} = req.body
    try {
        const newDailyTask = await DailyTask.create({name, description, points})
        res.status(200).send(newDailyTask)
    } catch(e) {
        res.status(404).send("Error", e)
    }
}

const getDailyTask = async (req,res) => {
    const {id} = req.body
    try {
        const output = await DailyTask.findById(id)
        if(!output) {
            res.status(404).json("No daily task")

        }
        res.status(200).send(output)
    } catch(e) {
        res.status(404).json("Error: ", e)

    }
}

const resetDailyTask = async (req, res) => {
    try {
        const users = await User.find({});
        const dailyTasks = await DailyTask.find({});

        for (const user of users) {
            console.log(user)
            user.tasks = [];
            for (let i = 0; i < 3; i++) {
                const randomNum = Math.floor(Math.random() * (dailyTasks.length - 2)) + 2;
                user.tasks.push({ task: dailyTasks[randomNum], status: "Incomplete" });
            }
            await user.save();  // Save the updated user document
        }

        res.status(200).send("tasks reset");
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
}


module.exports = {addDailyTask, resetDailyTask, getDailyTask}