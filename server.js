const express = require('express');
const cors = require('cors'); // Require CORS package
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

var cron = require('node-cron');


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

app.get('/getCommunityTask', async (req, res) => {
    try {
        res.send("community task")

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});





mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
