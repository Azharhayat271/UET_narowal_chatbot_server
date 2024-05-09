const mongoose = require('mongoose');


const HostelSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    domicile: {
        type: String,
        required: true
    },
    ecadMarks: {
        type: Number,
        required: true
    },
    documentsLinks: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Hostel', HostelSchema);
