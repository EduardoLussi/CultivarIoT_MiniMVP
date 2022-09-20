const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor' 
    },
});

module.exports = mongoose.model('payload', PayloadSchema);