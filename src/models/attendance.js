const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rollNumber: {type: String, required: true},
    department: {type: String, required: true},

});

module.exports = mongoose.model('Attendance', AttendanceSchema);
