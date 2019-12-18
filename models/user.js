const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userEmail: { type: String, unique: true, required: true },
    userPassCode: { type: String, required: true }
})

const User = mongoose.model("User", userSchema )

module.exports = User;