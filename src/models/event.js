const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    entryTime: {type: Number, required: true},
    eligibleGroups: [{ department: String, yearOfPassing: Number }],
});

module.exports = mongoose.model('Event', EventSchema);
