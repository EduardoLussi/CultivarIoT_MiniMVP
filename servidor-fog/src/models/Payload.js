const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now },
    sensor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor' 
    },
});

module.exports = mongoose.model('Payload', PayloadSchema);