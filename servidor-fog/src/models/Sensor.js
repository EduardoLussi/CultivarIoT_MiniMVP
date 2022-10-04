/**
 * Sensor model for mongodb database
 * Sensor is a specific sensor that exists
 */

// Import schema
const mongoose = require('mongoose');

// Create schema
const SensorSchema = new mongoose.Schema({
    sensor_type: {  // Type of the sensor
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    },
    name: String
});

// Exports mongoose model for collection sensor
// of SensorSchema
module.exports = mongoose.model('sensor', SensorSchema);