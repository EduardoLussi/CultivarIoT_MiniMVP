/**
 * AttributeSensorType model for mongodb database
 * Describes an Attribute that can be readed by a SensorType
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const AttributeSensorTypeSchemma = new mongoose.Schema({
    attribute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'attribute' 
    },
    sensor_type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    }
});

// Exports mongoose model for collection attribute_sensor_type
// of AttributeSensorTypeSchemma
module.exports = mongoose.model('attribute_sensor_type', AttributeSensorTypeSchemma);