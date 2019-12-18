const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userEmail: { type: String, unique: true, required: true, minlength: 3 },
    userPassCode: { type: String, required: true, minlength: 3 },
    isAdmin: Boolean
});

const User = mongoose.model("User", userSchema );

module.exports = User;