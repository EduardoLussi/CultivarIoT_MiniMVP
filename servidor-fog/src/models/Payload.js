const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now },
    device_type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'device_type' 
    },
});

module.exports = mongoose.model('Payload', PayloadSchema);