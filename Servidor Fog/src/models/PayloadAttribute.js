const mongoose = require('mongoose');

const PayloadAttribute = new mongoose.Schema({
    value: Number,
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attribute' 
    },
    payload: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Payload' 
    },
});

module.exports = mongoose.model('PayloadAttribute', PayloadAttribute);