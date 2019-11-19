const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    checkInDateTime: { type: Date}
});

const Attendee = mongoose.model("Attendee", attendeeSchema )

module.exports = Attendee;

