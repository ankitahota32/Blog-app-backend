require('dotenv').config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('failed');
    })


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User
