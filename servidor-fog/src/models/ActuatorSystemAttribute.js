/**
 * ActuatorSystemAttribute model for mongodb database
 * Specifies the Actuator responsability over an Attribute control in a System
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const ActuatorSystemAttributeSchema = new mongoose.Schema({
    actuator: { // Actuator
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator'
    },
    system_attribute: { // System's control over an Attribute
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_attribute'
    },
});

// Exports mongoose model of collection actuator_system_attribute
// for ActuatorSystemAttributeSchema
module.exports = mongoose.model('actuator_system_attribute', ActuatorSystemAttributeSchema);