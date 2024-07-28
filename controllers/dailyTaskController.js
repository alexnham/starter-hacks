const DailyTask = require('../models/DailyTask')
const User = require('../models/User')

const addDailyTask = async (req, res) => {
    const { name, description, points } = req.body
    try {
        const newDailyTask = await DailyTask.create({ name, description, points })
        res.status(200).send(newDailyTask)
    } catch (e) {
        res.status(404).send("Error", e)
    }
}

const getUserDailyTasks = async (req, res) => {
    const { username } = req.body
    try {
        const output = await User.findOne({ username })
        if (!output) {
            res.status(404).json("No user")
        }
        let tasks = []
        for (let i = 0; i < output.tasks.length; i++) {
            tasks.push(await getDailyTask(output.tasks[i].task))
        }

        res.status(200).json(tasks)
    } catch (e) {
        res.status(404).json("Error: ", e)
    }
}
const createUserDailyTasks = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json("No user");
        }

        let tasks = [];
        for (let i = 0; i < user.tasks.length; i++) {
            tasks.push(await getDailyTask(user.tasks[i].task));
        }

        const dailyTasks = await DailyTask.find({});
        if (dailyTasks.length < 3) {
            return res.status(400).json("Not enough daily tasks available");
        }

        const usedIndices = new Set();
        while (usedIndices.size < 3) {
            const randomNum = Math.floor(Math.random() * dailyTasks.length);
            if (!usedIndices.has(randomNum)) {
                usedIndices.add(randomNum);
                user.tasks.push({ task: dailyTasks[randomNum], status: "Incomplete" });
            }
        }

        await user.save();
        console.log("HI")
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
const completeUserDailyTask = async (req, res) => {
        const { username, id } = req.body;
        try {
            const output = await User.findOne({ username });
            if (!output) {
                return res.status(404).json("No user");
            }

            let taskFound = false;
            for (let i = 0; i < output.tasks.length; i++) {
                if (output.tasks[i].task.toString() === id.toString()) {
                    output.tasks[i].status = "Complete";
                    const task = await DailyTask.findById(id);
                    if (task) {
                        output.points += task.points;
                        taskFound = true;
                    }
                    break;  // Assuming only one task needs to be updated
                }
            }

            if (!taskFound) {
                return res.status(405).json("Task not found in user's tasks");
            }

            await output.save();
            console.log("success");
            return res.status(200).json(output);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    };


    const getDailyTask = async (id) => {
        try {
            const output = await DailyTask.findById(id)
            if (!output) {
                return null
            }
            return output
        } catch (e) {
            return e
        }
    }


    const resetDailyTask = async (req, res) => {
        try {
            const users = await User.find({});
            const dailyTasks = await DailyTask.find({});
            for (const user of users) {
                const tasks = [];
                const communityTask = 0;
                for (let i = 0; i < 3; i++) {
                    const randomNum = Math.floor(Math.random() * (dailyTasks.length - 2)) + 2;
                    tasks.push({ task: dailyTasks[randomNum], status: "Incomplete" });
                }
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: { tasks, communityTask } },
                    { new: true, useFindAndModify: false }
                );
            }
            console.log("tasks reset");
            //res.status(200).send("tasks reset");
        } catch (e) {
            console.log(e);
            //res.status(404).send(e);
        }
    };
    


    module.exports = { addDailyTask, resetDailyTask, getDailyTask, getUserDailyTasks, completeUserDailyTask, createUserDailyTasks }