const User = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email } = req.body;

        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            return res.status(404).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: encryptedPassword,
            email: email,
            tasks: [],
            streak: 0,
            points: 0
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("No user found");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(404).send("Incorrect password");
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e);
    }
};

const getTopUsers = async (req, res) => {
    try {
        const topUsers = await User.find().sort({ points: -1 }).limit(10);
        res.status(200).json(topUsers);
    } catch (error) {
        console.error('Error fetching top users:', error);
        res.status(500).json({ error: 'An error occurred while fetching top users' });
    }
};

// New function to update user's streak and points
const updateUserStats = async (req, res) => {
    try {
        const { email, streak, points } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            { streak, points },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("No user found");
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user stats:', error);
        res.status(500).json({ error: 'An error occurred while updating user stats' });
    }
};

module.exports = { signup, login, getTopUsers, updateUserStats };
