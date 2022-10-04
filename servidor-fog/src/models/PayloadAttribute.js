/**
 * PayloadAttribute model for mongodb database
 * PayloadAttribute is a part of Payload related to an Attribute
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const PayloadAttributeSchema = new mongoose.Schema({
    value: Number,  // Value readed by the Sensor of the Payload
    attribute: {    // Attribute
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    payload: {      // Payload that owns this Attribute read
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'payload' 
    }
});

// Exports mongoose model for collection payload_attribute 
// of PayloadAttributeSchema
module.exports = mongoose.model('payload_attribute', PayloadAttributeSchema);