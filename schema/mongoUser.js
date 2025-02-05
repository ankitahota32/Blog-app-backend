const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ankitahota3264:ankita123@cluster0.nqjqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
