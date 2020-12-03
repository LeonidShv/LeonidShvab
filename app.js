const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
cors = require('cors')
const User = require("./model/User")

const app = express();
app.use(cors())
app.use(express.json({ extented: true }));

app.post('/api/login', async (req, res) => {
    const user = await User.UserList.findOne({email: req.body.email})
  
    if (user) {

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Логин или пароль неверны"
            })

            return false
        }
        
        console.log('isMatch: ', isMatch);

        res.status(200).json({
            success: true,
        })
        
        return false
    }

    res.status(400).json({
        success: false,
        message: "Такой логин или пароль не сущест  свуют"
    })
})


app.post('/api/registration', async (req, res) => {

    const users = await User.UserList.findOne({email: req.body.email})

    console.log('users: ', users);
    if (!users) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        await User.UserList.create({
            _id: new Date().getTime(),
            email: req.body.email,
            password: hashedPassword
        })


        res.status(200).json({
            success: true,
            message: "Вы зарегались, уря!"
        })
        
        return false
    }

    res.status(400).json({
        success: false,
        message: "Такой имейл уже занят, включай фантазию, мразь!"
    })
})

const PORT = 5000

async function start() {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@phone-store-cluster.eaf96.mongodb.net/Shvab?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`Listren server on ${PORT}`))
    } catch (err) {
        console.log("Server Error", err.message);
        process.exit()
    }
}

start();