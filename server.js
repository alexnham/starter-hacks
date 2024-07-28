const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cron = require('node-cron');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import controllers
const { addCommunityTask, getCommunityTask, getAllCommunityTasks, updateCommunityTaskID } = require('./controllers/communityTaskController');
const { addDailyTask, resetDailyTask } = require('./controllers/dailyTaskController');
const { signup, login } = require('./controllers/userController');

// Cron job to update CommunityTaskID every minute
cron.schedule('* * * * *', () => {
    console.log('Running cron job to update CommunityTaskID');
    updateCommunityTaskID();
});

// Routes
app.get('/leaderboard', async (req, res) => {
    try {
        res.send("leaderboard");
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get('/user/get', async (req, res) => {
    try {
        res.send("user");
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get('/getUserTasks', async (req, res) => {
    try {
        res.send("user tasks");
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get('/tasks/getAllCommunityTasks', getAllCommunityTasks);
app.post('/tasks/addCommunityTask', addCommunityTask);
app.post('/tasks/addDailyTask', addDailyTask);
app.post('/user/signup', signup);
app.post('/user/login', login);


// Connect to MongoDB and start server
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });