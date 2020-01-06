const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    fullName: {type: String, required: true },
    userEmail: {type: String, unique: true, required: true },
    userLocation: {type: String, required: true },
    checkInTime: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Attendee = mongoose.model("Attendee", attendeeSchema )


module.exports = Attendee;

