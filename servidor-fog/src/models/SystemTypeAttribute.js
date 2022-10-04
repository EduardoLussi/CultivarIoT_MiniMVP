/**
 * SystemTypeAttribute model for mongodb database
 * SystemTypeAttribute specifies a control
 * of a SystemType over an Attribute
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SystemTypeAttributeSchema = new mongoose.Schema({
    attribute: {    // Attribute controlled 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    actuator_type: {    // Type of Actuator that controls the Attribute
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actuator_type'
    },
    sensor_type: {  // Type of Sensor that reads values of the Attribute
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sensor_type'
    },
    system_type: {  // Type of System that controls the Attribute
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_type'
    },
    // If the action of Actuator increase the Number value of the Attribute
    actuator_increase: Boolean
});

// Exports mongoose model for collection system_type_attribute
//  of SystemTypeAttributeSchema
module.exports = mongoose.model('system_type_attribute', SystemTypeAttributeSchema);