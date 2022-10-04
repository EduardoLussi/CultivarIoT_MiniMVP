/**
 * Payload model for mongodb database
 * Payload is created by Sensors and stored in db
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const PayloadSchema = new mongoose.Schema({
    // Date (now)
    date: { type: Date, default: Date.now },
    sensor: {   // Sensor that created the payload
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor' 
    },
});

// Exports mongoose model for collection
// attribute of PayloadSchema
module.exports = mongoose.model('payload', PayloadSchema);