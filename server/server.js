const express = require('express');
const cors = require('cors'); // Require CORS package
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

var cron = require('node-cron');

// which community task is the active one?
// why do we have addTask if we have a task bank in the backend
const {addCommunityTask, getCommunityTask} = require('./controllers/communityTaskController');
const { addDailyTask } = require('./controllers/dailyTaskController');
const { signup, login } = require('./controllers/userController');
app.use(express.json());

// daily update 
cron.schedule('0 0 * * *', () => {
    // TODO: update daily community task
});


app.get('/leaderboard', async (req, res) => {
    try {
        res.send("leaderboard")

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.get('/user/get', async (req, res) => {
    try {
        res.send("user")

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.get('/getUserTasks', async (req, res) => {
    try {
        res.send("user tasks")

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.post('/tasks/addCommunityTask', addCommunityTask);
app.post('/tasks/addDailyTask', addDailyTask)
app.post('/user/signup',signup)
app.post('/user/login',login)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })