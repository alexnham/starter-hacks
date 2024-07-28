const User = require('../models/User')
const bcrypt = require('bcrypt')


const signup = async (req, res) => {
    try {
    console.log(req)
    const {firstName, lastName, username, password, email} = req.body
    
    const oldUser = await User.findOne({email:email})
    if(oldUser) {
        res.status(404).send("user exists")
    }
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            username:username,
            password: encryptedPassword,
            email:email,
            tasks: [],
            streak: 0,
            points: 0,
            communityTask: 0
        })
        res.status(200).send(user);
    } catch(error) {
        res.status(404).send(error)
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            res.status(404).send("no user found")
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            res.status(404).send("incorrect password")
        }
        res.status(200).send(user)
    } catch(e) {
        res.status(404).send(e)
    }
}
module.exports = {signup,login}