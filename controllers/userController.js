const User = require('../models/User')


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
            firstName,
            lastName,
            username,
            password: encryptedPassword,
            email
        })
        res.send({status: "ok", data: "User created"});
    } catch(error) {
        res.send({status: "error", data: error})
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