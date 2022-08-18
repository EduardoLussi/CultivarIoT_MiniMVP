const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    system_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'system' 
    }, 
    sensor_type_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor_type' 
    },
    name: String
});

module.exports = mongoose.model('sensor', SensorSchema);