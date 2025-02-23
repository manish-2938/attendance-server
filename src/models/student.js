const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required:true},
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
});

module.exports = mongoose.model('Student', StudentSchema);
