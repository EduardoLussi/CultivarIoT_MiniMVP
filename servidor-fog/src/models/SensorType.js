const mongoose = require('mongoose');

const SensorTypeSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('sensor_type', SensorTypeSchema);