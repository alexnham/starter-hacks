const User = require('../models/User')
const bcrypt = require('bcrypt')


const signup = async (req, res) => {
    try {
    
    const {firstName, lastName, username, password, email} = req.body
    
    const oldUser = await User.findOne({email:email})
    if(oldUser) {
        res.send({status: "error", data: "user already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
       await User.create({
            firstName:firstName,
            lastName:lastName,
            username:username,
            password: encryptedPassword,
            email:email,
            tasks: [],
            streak: 0
        })
        res.send(200).send(username);
    } catch(error) {
        console.log(error)
        res.status(404).send("hi")
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body

        const user = await this.findOne({email})

        if(!user) {
            res.status(404).send("no user found")
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            res.status(404).send("incorrect password")
        }
        return user
    } catch(e) {
        res.status(404).send(e)
    }
}
module.exports = {signup,login}