/**
 * Actuator model for mongodb database
 */


// Import mongoose
const mongoose = require('mongoose');

// Create schema
const ActuatorSchema = new mongoose.Schema({
    address: String,    // IP address
    actuator_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator_type'
    }
});

// Exports mongoose model of collection actuator for ActuatorSchema
module.exports = mongoose.model('actuator', ActuatorSchema);