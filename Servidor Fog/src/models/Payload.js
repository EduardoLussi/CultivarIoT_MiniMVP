const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now },
    deviceType: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DeviceType' 
    },
});

module.exports = mongoose.model('Payload', PayloadSchema);