// backend/models/photoModel.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Photo', photoSchema);
