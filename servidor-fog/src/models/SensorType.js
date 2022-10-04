/**
 * SensorType model for mongodb database
 * SensorType is a type of sensor
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const SensorTypeSchema = new mongoose.Schema({
    name: String
});

// Exports mongoose model for collection
// sensor_type of SensorTypeSchema
module.exports = mongoose.model('sensor_type', SensorTypeSchema);