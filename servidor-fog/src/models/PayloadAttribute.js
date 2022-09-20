const mongoose = require('mongoose');

const PayloadAttribute = new mongoose.Schema({
    value: Number,
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    payload: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'payload' 
    }
});

module.exports = mongoose.model('payload_attribute', PayloadAttribute);