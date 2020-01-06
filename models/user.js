const mongoose         = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true, minlength: 5 },
    userEmail: { type: String, unique: true, required: true, minlength: 3 },
    userPassCode: { type: String, required: true, minlength: 3 },
    isManager: Boolean
});

const User = mongoose.model("User", userSchema );

module.exports = User;