const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    author: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);

module.exports = {User}