const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    userEmail: {type: String, unique: true, required: true},
    checkInTime: { type: Date}
});

const Attendee = mongoose.model("Attendee", attendeeSchema )

module.exports = Attendee;

