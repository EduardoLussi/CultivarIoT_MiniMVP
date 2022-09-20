const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    sensor_type: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    },
    name: String
});

module.exports = mongoose.model('sensor', SensorSchema);