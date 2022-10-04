/**
 * SystemAttribute model for mongodb database
 * Represents a specific control of a System over an Attribute
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SystemAttributeSchema = new mongoose.Schema({
    system_type_attribute: {    // The type of control
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_type_attribute'
    },
    system: {   // The System that is controlling
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system'
    },
    target_value: Number,   // Target value of the Attribute
    active: Boolean     // If the control is active
});

// Exports mongoose model for collection system_attribute
// of SystemAttributeSchema
module.exports = mongoose.model('system_attribute', SystemAttributeSchema);