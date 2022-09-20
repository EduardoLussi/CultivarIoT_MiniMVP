const mongoose = require('mongoose');

const SensorSystemAttribute = new mongoose.Schema({
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor' 
    },
    system_attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'system_attribute'
    },
});

module.exports = mongoose.model('sensor_system_attribute', SensorSystemAttribute);