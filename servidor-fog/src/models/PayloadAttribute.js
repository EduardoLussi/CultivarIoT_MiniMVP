const mongoose = require('mongoose');

const PayloadAttribute = new mongoose.Schema({
    value: Number,
    attribute_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    payload_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'payload' 
    }
});

module.exports = mongoose.model('payload_attribute', PayloadAttribute);