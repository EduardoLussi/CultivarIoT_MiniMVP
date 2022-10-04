/**
 * SensorSystemAttribute model for mongodb database
 * Specifies that a Sensor reads values for a System control
 * over an Attribute
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SensorSystemAttributeSchema = new mongoose.Schema({
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor' 
    },
    system_attribute: { // The control of a System over an Attribute
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_attribute'
    },
});

// Exports mongoose model for collection sensor_system_attribute
// of SensorSystemAttributeSchema
module.exports = mongoose.model('sensor_system_attribute', SensorSystemAttributeSchema);