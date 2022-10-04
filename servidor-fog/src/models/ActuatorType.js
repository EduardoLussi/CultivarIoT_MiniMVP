/**
 * ActuatorType model for mongodb database
 * Specifies types of actuators for standardization
 */

// Import mongoose
const mongoose = require('mongoose');

// Create schema
const ActuatorTypeSchema = new mongoose.Schema({
    // Only _id
});

// Exports mongoose model for collection actuator_type of ActuatorTypeSchema
module.exports = mongoose.model('actuator_type', ActuatorTypeSchema);