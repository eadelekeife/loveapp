const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ieadeleke:biochemistry@cluster0.yrxma.mongodb.net/?retryWrites=true&w=majority&appName=loveapp");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    interested_in: {
        type: String,
        require: true
    },
    spec: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email_address: {
        type: String,
        require: true
    }
})

const userModel = new mongoose.model("user", userSchema);

module.exports = {
    userModel
}